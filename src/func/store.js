import { writable, get } from 'svelte/store';
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import { db } from './firebase-init'
import { importJSON } from './importer'
import { is_empty } from "svelte/internal";
import { buildMemberStatistics } from "./statistics";

async function saveArchive(tourName, archive) {
	try {
		await setDoc(doc(db, "archives", tourName), {
			...archive,
			id: tourName,
		});
		console.log("Document written with ref: ", tourName);
	} catch (e) {
		console.error("Error adding document: ", e);
		throw e
	}
}

let archiveCache = {};

function unsafeRetrieveArchive(id) {
	return archiveCache[id];
}

function reloadArchive(id) {
	if (id != null && id.toLowerCase() in archiveCache) {
		currentArchiveStore.set(archiveCache[id.toLowerCase()]);
	} else {
		loadAllArchives().then((result) => {
			currentArchiveStore.set(result[0]);
		});
	}
}

async function loadAllArchives() {
	if (is_empty(archiveCache)) {
		try {
			const query = await getDocs(collection(db, "archives"));
			const result = query.docs
				.map((doc) => doc.data())
				.sort((x, y) => new Date(x.data.date) < new Date(y.data.date) ? 1 : -1);
			archiveCache = result.reduce((map, doc) => (map[doc.id.toLowerCase()] = doc, map), {})
			archiveIdListStore.set(result.map((doc) => {
				return {
					"id": doc.id,
					"date": doc.data.date
				}
			}));
			buildMemberStatistics(result)
			return result;
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}
}

function btagReduction(id) {
	return id.split('#')[0]
}

function updateArchiveWithPlaces(challongeMap) {
	const currentArchive = get(currentArchiveStore);
	currentArchive.data.teams.map((team) => {
		const foundTeam = challongeMap[btagReduction(team.name).toLowerCase()]
		if (foundTeam) {
			team.place = foundTeam.place
		} else {
			team.place = null
		}
	});
	currentArchiveStore.set(currentArchive);
}

async function importArchive() {
	await importJSON((jsonData) => {
		currentArchiveStore.set(JSON.parse(jsonData));
	});
}

async function importChallonge() {
	await importJSON((jsonData) => {
		const challongeMap = JSON.parse(jsonData).map((doc) => {
			return {
				"name": doc.participant.display_name,
				"place": doc.participant.final_rank,
			}
		}).reduce((map, doc) => (map[doc.name.toLowerCase()] = doc, map), {})
		updateArchiveWithPlaces(challongeMap)
	});
}

const currentArchiveStore = writable(
	{}
);

const archiveIdListStore = writable(
	{}
);

export {
	currentArchiveStore,
	archiveIdListStore,
	reloadArchive,
	saveArchive,
	importArchive,
	importChallonge,
	loadAllArchives,
	unsafeRetrieveArchive
};
