import User from '../models/user.js'


const seedUsers = [
        {
            firstName: 'Leanne',
            lastName: 'Graham',
            email: 'sincere@april.biz'
        },
        {
            firstName: 'Ervin',
            lastName: 'Howell',
            email: 'shanna@melissa.tv'
        },
        {
            firstName: 'Clementine',
            lastName: 'Bauch',
            email: 'athan@yesenia.net'
        },
        {
            firstName: 'Patricia',
            lastName: 'Lebsack',
            email: 'julianne.OConner@kory.org'
        },
        {
            firstName: 'Chelsey',
            lastName: 'Dietrich',
            email: 'Lucio_Hettinger@annie.ca'
        },
        {
            firstName: 'Dennis',
            lastName: 'Schulist',
            email: 'karley_Dach@jasper.info'
        },
        {
            firstName: 'Kurtis',
            lastName: 'Weissnat',
            email: 'telly.Hoeger@billy.biz'
        },
        {
            firstName: 'Nicholas',
            lastName: 'Runolfsdottir',
            email: 'Sherwood@rosamond.me'
        },
        {
            firstName: 'Glenna',
            lastName: 'Reichert',
            email: 'chaim_McDermott@dana.io'
        },
        {
            firstName: 'Clementina',
            lastName: 'DuBuque',
            email: 'padberg@karina.biz'
        }
]
    
    const seedDatabase = async () => {
        try {
            const res = await User.insertMany(seedUsers);
            console.log('Dane zostały pomyślnie dodane:', res);
        } catch (e) {
            console.error('Błąd podczas wstawiania danych:', e.message);
        }
    };
    
export default seedDatabase;