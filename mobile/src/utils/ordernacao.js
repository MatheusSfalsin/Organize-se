const ordernacao = {
    ordernar: function (array) {
        let a = array.slice()
        a.sort(function (a, b) {
            if (a.dataEHora < b.dataEHora) {
                return 1;
            }
            if (a.dataEHora > b.dataEHora) {
                return -1;
            }
            // a must be equal to b
            return 0;
        })
        return a
    }
}

export default ordernacao;

