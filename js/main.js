//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('.pick-cocktail').addEventListener('click', getDrink)
document.querySelector('.random-cocktail').addEventListener('click', getRandom)

function getDrink() {
  const drink = document.querySelector('input').value
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      document.querySelector('.container').classList.remove('hidden')
      console.log(data.drinks)
      document.querySelector('h2').innerText = data.drinks[0].strDrink
      document.querySelector('img').src = data.drinks[0].strDrinkThumb
      document.querySelector('p').innerText = data.drinks[0].strInstructions
      document.querySelector('input').value = ''
      document.querySelector('ul').innerHTML = ''

      const substring = 'strIngredient'

      for (i in data.drinks[0]) {
        if (i.includes(substring) && data.drinks[0][i]) {
          console.log(data.drinks[0][i])
          const li = document.createElement('li')
          li.innerText = data.drinks[0][i]
          document.querySelector('ul').appendChild(li)
        }
      }

    })
    .catch(err => {
      console.log(`error ${err}`)
    })
  }

  function getRandom() {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`

    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        document.querySelector('.container').classList.remove('hidden')
        document.querySelector('h2').innerText = data.drinks[0].strDrink
        document.querySelector('img').src = data.drinks[0].strDrinkThumb
        document.querySelector('p').innerText = data.drinks[0].strInstructions
        document.querySelector('input').value = ''
        document.querySelector('ul').innerHTML = ''

        const substring = 'strIngredient'

        
        for (i in data.drinks[0]) {
          if (i.includes(substring) && data.drinks[0][i]) {
            const li = document.createElement('li')
            li.innerText = data.drinks[0][i]
            document.querySelector('ul').appendChild(li)
           }
        }

        console.log(data.drinks[0])
    
      })
      .catch(err => {
        console.log(`error ${err}`)
      })
  }