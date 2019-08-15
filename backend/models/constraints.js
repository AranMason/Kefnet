validFormats = ['Commander/EDH', 'Brawl', 'Oathbreaker', 'Standard', 'Modern', 'Legacy', 'Other'];

validProviders = {
    MTG_GOLDFISH: 'MTG Goldfish',
    ARCHIDEKT: 'Archidekt',
    TAPPEDOUT: 'Tappedout'
}



module.exports = {
    validFormats,
    validProviders,
    validProvidersList: () => Object.keys(this.validProviders).map((provider) => {
        return this.validProviders(provider);
    })
}