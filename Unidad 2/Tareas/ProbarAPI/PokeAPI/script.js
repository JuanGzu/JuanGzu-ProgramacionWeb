async function fetchPokemon(idOrName) {
    const pokemon = idOrName || document.getElementById('pokemon').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Pokémon no encontrado');
        const result = await response.json();
        
        document.getElementById('pokemon-image').src = result.sprites.front_default;
        document.getElementById('pokemon-name').textContent = result.name.toUpperCase();
        document.getElementById('pokemon-id').textContent = result.id;
        document.getElementById('pokemon-type').textContent = result.types.map(t => t.type.name).join(', ');
        document.getElementById('pokemon-abilities').textContent = result.abilities.map(a => a.ability.name).join(', ');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1; // 898 es la cantidad de Pokémon en PokeAPI
    fetchPokemon(randomId);
}

async function fetchRandomTeam() {
    document.getElementById('pokemon-team').innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const randomId = Math.floor(Math.random() * 898) + 1;
        const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Pokémon no encontrado');
            const result = await response.json();
            
            const card = document.createElement('div');
            card.classList.add('pokemon-card');
            card.innerHTML = `
                <img src="${result.sprites.front_default}" alt="${result.name}">
                <p><strong>${result.name.toUpperCase()}</strong></p>
                <p>ID: ${result.id}</p>
                <p>Tipo: ${result.types.map(t => t.type.name).join(', ')}</p>
            `;
            document.getElementById('pokemon-team').appendChild(card);
        } catch (error) {
            console.error('Error al obtener Pokémon:', error);
        }
    }
}