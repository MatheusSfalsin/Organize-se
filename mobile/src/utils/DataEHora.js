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

}

export default dataEHora;

