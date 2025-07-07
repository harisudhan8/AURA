let sortBy = 'timestamp';
let order = 'desc';
const backendUrl = 'https://aura-zes5.onrender.com';

const likeSound = new Audio('likes.mp3');
async function fetchMessages() {
    const sortBy = document.getElementById('sortField').value;
    const order = document.getElementById('sortOrder').value;

    const response = await fetch(`${backendUrl}/api/thoughts?sortBy=${sortBy}&order=${order}`);
    const thoughts = await response.json();

    const container = document.getElementById('messageContainer');
    container.innerHTML = '';

    thoughts.forEach(thought => {
        const card = document.createElement('div');
        const colors = ['green', 'blue', 'yellow', 'red', 'orange'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        card.className = `message-card ${randomColor}`;
        card.innerHTML = `
            <p>${thought.message}</p>
            <p class="like-btn" onclick="likeMessage('${thought._id}')">💛 ${thought.likes}</p>
            <p>${new Date(thought.timestamp).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        `;
        container.appendChild(card);
    });
}


async function submitMessage() {
    const message = document.getElementById('messageInput').value;
    if (!message.trim()) return;

    await fetch(`${backendUrl}/api/thoughts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });

    // Play sound
    const audio = new Audio('post-sound.mp3');
    audio.play();

    // Close form
    document.getElementById('formOverlay').style.display = 'none';
    document.body.classList.remove('blur-background');
    document.getElementById('messageInput').value = '';

    fetchMessages();
}

async function likeMessage(id) {
    likeSound.play();
    await fetch(`${backendUrl}/api/thoughts/${id}/like`, { method: 'POST' });
    fetchMessages();
}

function sortMessages() {
    if (sortBy === 'timestamp') {
        sortBy = 'likes';
        order = 'desc';
    } else {
        sortBy = 'timestamp';
        order = order === 'desc' ? 'asc' : 'desc';
    }
    fetchMessages();
}

function openForm() {
    document.getElementById('formOverlay').style.display = 'flex';
    document.body.classList.add('blur-background');
}

fetchMessages();
