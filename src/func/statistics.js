import { writable } from 'svelte/store';
import { sortByPlace } from "./placement";

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

let memberStatistcsCache = new ExtendedMap(() => {
    return {
        "name": null,
        "seasons": []
    }
})

function buildSeason(player, team, season) {
    return {
        "id": season.id,
        "date": season.date,
        "captain": team.name,
        "role": player.role,
        "rank": player.rank,
        "place": team.place ? team.place : null,
    }
}

function buildMemberStatistics(archives) {
    archives = archives.map(arch => {
        return {
            "id": arch.id,
            "date": arch.data.date,
            "teams": arch.data.teams,
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
    })
    buildAllPlayerTable(memberStatistcsCache);
}

function getMemberInfo(id) {
    if (memberStatistcsCache.has(id)) {
        return memberStatistcsCache.get(id);
    } else {
        console.error(`Player ${id} not found in statistics`)
    }
}

const allPlayersStore = writable(
    {}
)

function buildAllPlayerTable(memberStatistcs) {
    let allPlayers = []
    for (let [_, player] of memberStatistcs) {
        const lastSeason = player.seasons.sort((x, y) => new Date(x.date) < new Date(y.date) ? 1 : -1)[0]
        allPlayers.push({
            "name": player.name,
            "tournaments_played": player.seasons.length,
            "highest_score": sortByPlace(player.seasons)[0].place,
            "highest_div": player.seasons.sort((a, b) => b.rank - a.rank)[0].rank,
            "latest_score": lastSeason.place,
            "latest_div": lastSeason.rank,
        })
    }
    allPlayersStore.set(allPlayers);
}

export { getMemberInfo, buildMemberStatistics, allPlayersStore }
