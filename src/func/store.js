import { writable } from 'svelte/store';
import { collection, setDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from './firebase-init'
import { importJSON } from './importer'
import { is_empty } from "svelte/internal";
import { buildMemberStatistics, identifyPlace } from "./statistics";

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

async function loadArchive(tourName) {
	try {
		const docRef = doc(db, "archives", tourName);
		return (await getDoc(docRef)).data();
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}

let archiveCache = {};

function unsafeRetrieveArchive(id) {
	return archiveCache[id];
}

function reloadArchive(id) {
	if (id in archiveCache) {
		currentArchiveStore.set(archiveCache[id]);
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
			result.forEach((season) => season.data.teams.map((team) => {
					team.place = identifyPlace(team.name, season.finalist)
				}))
			archiveCache = result.reduce((map, doc) => (map[doc.id] = doc, map), {})
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

async function importArchive() {
	await importJSON((jsonData) => {
		currentArchiveStore.set(JSON.parse(jsonData));
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
	loadAllArchives,
	unsafeRetrieveArchive
};
