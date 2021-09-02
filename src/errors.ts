export class IncompatibleGenderError extends Error {
    constructor() {
        super("Incompatible gender");
    }
};

export class IncompatibleEggGroupError extends Error {
    constructor() {
        super("Incompatible egg group");
    }
};