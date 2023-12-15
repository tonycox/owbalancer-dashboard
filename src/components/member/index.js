import TankIcon from "../../icons/Tank.svelte";
import SupportIcon from "../../icons/Support.svelte";
import DamageIcon from "../../icons/Damage.svelte";

function getRoleIcon(role) {
    switch (role) {
        case "tank":
            return TankIcon;
        case "dps":
            return DamageIcon;
        case "support":
            return SupportIcon;
        default:
            return undefined;
    }
}

export {
    getRoleIcon
}
