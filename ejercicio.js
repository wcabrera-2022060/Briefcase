// ---------------------- Ejercicio ---------------------------- //

//ASYNC / AWAIT
const getUsersWithAsync = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=10')
        //await solo se puede en asincronas 
        const { results } = await response.json()
        //desestructuro y parseo

        const users = document.getElementById('users')

        for (const user of results) {
            users.innerHTML += `
        <tr>
        <td>${user.name.first}</td>
        <td>${user.name.last}</td>
        <td>${user.phone}</td>
        </tr>
        `
        }
    } catch (error) {
        console.error(error)
    }
}

getUsersWithAsync()