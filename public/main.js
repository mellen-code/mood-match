document.querySelector('.button').addEventListener('click', findMood) 

async function findMood() {
    console.log('function working')
    const mood = document.querySelector('input').value

    try {
        const response = await fetch(`https://cher-moods.up.railway.app/${mood}`)
        const data = await response.json()

        console.log(data)

        document.querySelector('h3').innerText = data.image

        document.querySelector('h4').innerText = data.imageCaption
        
    }catch(error) {
        console.log(error)
    }
}


