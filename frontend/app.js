let sortBy = 'timestamp';
let order = 'desc';

const backendUrl = 'https://aura-zes5.onrender.com';  // 👈 Add your backend URL here

async function fetchMessages() {
    const response = await fetch(`${backendUrl}/api/thoughts?sortBy=${sortBy}&order=${order}`);
    const thoughts = await response.json();
    const container = document.getElementById('messageContainer');
    container.innerHTML = '';
    thoughts.forEach(thought => {
        const card = document.createElement('div');
        card.className = `message-card ${thought.likes % 2 === 0 ? 'green' : 'blue'}`;
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
    await fetch(`${backendUrl}/api/thoughts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });
    document.getElementById('messageInput').value = '';
    fetchMessages();
}

async function likeMessage(id) {
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
    document.getElementById('formContainer').style.display = 'block';
}

fetchMessages();
