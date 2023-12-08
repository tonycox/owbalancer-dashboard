import { writable } from 'svelte/store';
import { collection, setDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from './firebase-init'
import { importJSON } from './importer'
import { is_empty } from "svelte/internal";

class ExtendedMap extends Map {
	get(key) {
		if (!this.has(key)) {
			this.set(key, this.default());
		}
		return super.get(key);
	}

	constructor(defaultFunction, entries) {
		super(entries);
		this.default = defaultFunction;
	}
}

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

function reloadArchive(id) {
	if (id in archiveCache) {
		currentArchiveStore.set(archiveCache[id]);
	} else {
		loadArchive(id).then((archive) => {
			currentArchiveStore.set(archive);
			archiveCache[id] = archive;
		});
	}
}

let memberStatistcsCache = new ExtendedMap(() => {
	return {
		"name": null,
		"seasons": []
	}
});

function buildSeason(player, team, season) {
	return {
		"id": season.id,
		"date": season.date,
		"captain": team.name,
		"role": player.role,
		"rank": player.rank
	}
}

function buildMemberStatistics(archives) {
	archives = archives.map(arch => {
		return {
			"id": arch.id,
			"date": arch.data.date,
			"teams": arch.data.teams
		}
	})
	archives.forEach((season) => {
		season.teams.forEach((team) => {
			team.members.forEach((member) => {
				const name = member.name;
				const player = memberStatistcsCache.get(name);
				player.seasons.push(buildSeason(member, team, season));
				if (player.name === null) {
					player.name = name;
				}
			})
		})
	});
}

function getMemberInfo(id) {
	if (memberStatistcsCache.has(id)) {
		return memberStatistcsCache.get(id);
	} else {
		console.error(`Player ${id} not found in statistics`)
	}
}

async function loadAllArchives() {
	if (is_empty(archiveCache)) {
		try {
			const query = await getDocs(collection(db, "archives"));
			const result = query.docs
				.map((doc) => doc.data())
				.sort((x, y) => new Date(x.data.date) < new Date(y.data.date) ? 1 : -1);
			archiveCache = result.reduce((map, doc) => (map[doc.id] = doc, map), {});
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
	loadArchive,
	importArchive,
	loadAllArchives,
	getMemberInfo
};
