async function fetchPosts() {
    // Verifique se os posts já estão no localStorage
    const cachedPosts = localStorage.getItem('cached_posts');

    if (cachedPosts) {
        // Se estiverem, retorne os posts armazenados
        return JSON.parse(cachedPosts);
    }

    // Caso contrário, faça a requisição para buscar os posts
    try {
        const response = await fetch('https://crunchequation.com/wp-json/wp/v2/posts?per_page=100');
        const posts = await response.json();

        // Armazene os posts no localStorage para o próximo carregamento
        localStorage.setItem('cached_posts', JSON.stringify(posts));
        return posts;
    } catch (error) {
        console.error('Erro ao buscar os posts:', error);
        return []; // Retorna uma lista vazia em caso de erro
    }
}
         
function redirectToPostPage(post) {
    localStorage.setItem('clickedPost', JSON.stringify(post));
    window.location.href = './article.html';
}

async function displayAllPosts() {
    try {
        const posts = await fetchPosts();

        if (posts.length > 0) {
            displayPostTrending(posts);
            displayPostsBest(posts);
            displayMostRecentPost(posts[0]); // Exibindo apenas o post mais recente
            displayLastPost(posts[4]); // Exibindo apenas o último post
        } else {
            console.log('Nenhum post encontrado.');
        }
    } catch (error) {
        console.error('Erro ao exibir os posts:', error);
    }
}

function darkMode() {
    const themeToggleButton = document.querySelector('#logoTheme');
    const themeToggleButtonMobile = document.querySelector('#navMobile');

    themeToggleButton.addEventListener('click', () => {
        toggleDarkMode(); 
        atualizarImagemTema(); 
    });

    themeToggleButtonMobile.addEventListener('click', () => {
        toggleDarkMode(); 
        atualizarImagemTema(); 
    });
}


function toggleDarkMode() {
    const html = document.querySelector('html');
    const isDarkMode = html.classList.contains('dark');

    if (!isDarkMode) {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    } else {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
    }
}

function isDarkModeActive() {
    // Força o dark mode como padrão inicial
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');

    atualizarImagemTema();
}
