const roleOrder = {
    tank: 1,
    dps: 2,
    support: 3,
};

function sortByRole(members) {
    return members.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
}

function sortByFinalists(teams, finalist) {
    function find(place) {
        if (finalist != undefined && place in finalist) {
            return finalist[place];
        } else {
            return "";
        }
    }
    return teams
        .map((el) => {
            if (el.name == find("first_place")) {
                el.place = 1;
            } else if (el.name == find("second_place")) {
                el.place = 2;
            } else if (el.name == find("third_place")) {
                el.place = 3;
            } else {
                el.place = 4;
            }
            return el;
        })
        .sort((a, b) => a.place - b.place);
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
    sortByFinalists,
    adjustPlacementBorder
}
