//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('.pick-cocktail').addEventListener('click', getDrink)
document.querySelector('.random-cocktail').addEventListener('click', getRandom)

function createListOfIngredients(measure, ingredient) {
  const li = document.createElement('li')
  if (measure && ingredient) {
    li.innerText = `${measure} ${ingredient}`
  } else {
    li.innerText = `${ingredient}`
  }
  document.querySelector('ul').appendChild(li)
}


function getDrink() {
  const drink = document.querySelector('input').value
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      document.querySelector('.container').classList.remove('hidden')
      document.querySelector('h2').innerText = data.drinks[0].strDrink
      document.querySelector('img').src = data.drinks[0].strDrinkThumb
      document.querySelector('p').innerText = data.drinks[0].strInstructions
      document.querySelector('input').value = ''
      document.querySelector('ul').innerHTML = ''

      const ingredientSubstring = 'strIngredient'
      const measureSubstring = 'strMeasure'
      const drink = data.drinks[0]
      let measure = ''
      let ingredient = ''

      for (const [key, value] of Object.entries(drink)) {

        if (key.includes(ingredientSubstring) && value) {
          let measureKey = measureSubstring + key[key.length - 1]
          ingredient = value
          measure = drink[measureKey]
          console.log(`${measure} ${ingredient}`)
          createListOfIngredients(measure, ingredient)
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

        const ingredientSubstring = 'strIngredient'
        const measureSubstring = 'strMeasure'
        const drink = data.drinks[0]
        let measure = ''
        let ingredient = ''

        for (const [key, value] of Object.entries(drink)) {
          
          if (key.includes(ingredientSubstring) && value) {
            let measureKey = measureSubstring + key[key.length - 1]
            ingredient = value
            measure = drink[measureKey]
  
            createListOfIngredients(measure, ingredient)
        }
      }
    })
      .catch(err => {
        console.log(`error ${err}`)
      })
  }