document.querySelector('.button').addEventListener('click', findMood) 

async function findMood() {
    console.log('function working')
    const mood = document.querySelector('input').value

    try {
        const res = await fetch(`https://mood-match.up.railway.app/api/${mood}`)
        const data = await res.json()

        console.log(data)

        document.querySelector('h3').innerText = data.image

        document.querySelector('h4').innerText = data.imageCaption
        
    }catch(error) {
        console.log(error)
    }
}


