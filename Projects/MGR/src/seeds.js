import User from '../models/user.js'


const seedUsers = [
        {   
            id: 1,
            firstName: 'Leanne',
            lastName: 'Graham',
            email: 'sincere@april.biz'
        },
        {
            id: 2,
            firstName: 'Ervin',
            lastName: 'Howell',
            email: 'shanna@melissa.tv'
        },
        {   
            id: 3,
            firstName: 'Clementine',
            lastName: 'Bauch',
            email: 'athan@yesenia.net'
        },
        {   
            id: 4,
            firstName: 'Patricia',
            lastName: 'Lebsack',
            email: 'julianne.OConner@kory.org'
        },
        {   
            id: 5,
            firstName: 'Chelsey',
            lastName: 'Dietrich',
            email: 'Lucio_Hettinger@annie.ca'
        },
        {
            id: 6,
            firstName: 'Dennis',
            lastName: 'Schulist',
            email: 'karley_Dach@jasper.info'
        },
        {
            id: 7,
            firstName: 'Kurtis',
            lastName: 'Weissnat',
            email: 'telly.Hoeger@billy.biz'
        },
        {   
            id: 8,
            firstName: 'Nicholas',
            lastName: 'Runolfsdottir',
            email: 'Sherwood@rosamond.me'
        },
        {   
            id: 9, 
            firstName: 'Glenna',
            lastName: 'Reichert',
            email: 'chaim_McDermott@dana.io'
        },
        {   
            id: 10,
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