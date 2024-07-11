import { hostname } from "node:os";

const Constants = {
    ADM_CREDENTIALS: {
        user: `${hostname()}\\Administrador`,
        password: 'dspadmloc_001'
    }
}

export default Constants