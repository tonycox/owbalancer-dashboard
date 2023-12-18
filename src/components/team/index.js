const roleOrder = {
    tank: 1,
    dps: 2,
    support: 3,
};

function sortByRole(members) {
    return members.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
}

function sortByPlace(teams) {
    return teams.sort((a, b) => {
        if (a.place === null) {
            return 1;
        }
        if (b.place === null) {
            return -1;
        }
        return a.place - b.place
    });
}

function adjustPlacementBorder(team) {
    switch (team.place) {
        case 1:
            team.border_class = "gold";
            break;
        case 2:
            team.border_class = "silver";
            break;
        case 3:
            team.border_class = "bronze";
            break;
        default:
            team.border_class = "default";
    }
    return team;
}

export {
    sortByRole,
    sortByPlace,
    adjustPlacementBorder
}
