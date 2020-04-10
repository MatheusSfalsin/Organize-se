// import {
//     parseISO,
//     formatRelative,
//     formatDistance,
// } from 'date-fns';

import { format } from 'date-fns-tz';

// import pt from 'date-fns/locales/pt';

const dataEHora = {



    formattedDate: function (date) {
        // date = parseISO(date);
        return format(date, 'dd/MM/yyyy HH:mm:ss', {
            timeZone: 'America/Sao_Paulo',
          });
    },

    ordernar: function (array){
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


    // Dia 01 de Abril às 16:00h

    // distance: formatDistance(
    //     firstDate,
    //     secondDate
    // ),

    // // 24 horas

    // relative: formatRelative(
    //     firstDate,
    //     secondDate
    // )

}

export default dataEHora;

