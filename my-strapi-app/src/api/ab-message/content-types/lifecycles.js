module.exports = {
    async beforeCreate(event) {
      // Ajoute la date actuelle au champ 'date'
      event.params.data.date = new Date();
    },
  };
  