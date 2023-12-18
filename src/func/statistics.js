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
});

function buildSeason(player, team, season) {
    return {
        "id": season.id,
        "date": season.date,
        "captain": team.name,
        "role": player.role,
        "rank": player.rank,
        "place": team.place | null,
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
    });
}

function getMemberInfo(id) {
    if (memberStatistcsCache.has(id)) {
        return memberStatistcsCache.get(id);
    } else {
        console.error(`Player ${id} not found in statistics`)
    }
}

export { getMemberInfo, buildMemberStatistics };
