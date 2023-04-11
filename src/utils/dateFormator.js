export const dateFormator = (dt) => {

    const rawDate = new Date(dt);

    const time = rawDate.toLocaleTimeString();

    const dateFormatter = new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

    const date = dateFormatter.format(rawDate);

    return { date, time };
};