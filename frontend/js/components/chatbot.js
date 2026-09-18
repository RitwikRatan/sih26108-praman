export function initChatbot() {
  const chatbotHTML = `
    <div id="praman-chatbot-widget" style="position: fixed; bottom: 24px; right: 24px; z-index: 9999; font-family: var(--font-family);">
      <!-- Floating Button -->
      <button id="chatbot-toggle-btn" style="width: 56px; height: 56px; border-radius: 50%; background-color: var(--primary-blue); color: white; border: none; box-shadow: 0 4px 12px rgba(0,0,0,0.2); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </button>

      <!-- Chat Window -->
      <div id="chatbot-window" style="display: none; position: absolute; bottom: 70px; right: 0; width: 360px; height: 500px; background: white; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.2); border: 1px solid var(--border-color); flex-direction: column; overflow: hidden;">
        
        <!-- Header -->
        <div style="padding: 16px; background: var(--bg-main); border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="background: var(--primary-blue-light); color: var(--primary-blue); padding: 6px; border-radius: 8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2z"></path><path d="M16 12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4z"></path></svg>
            </div>
            <div>
              <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">Standards AI</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">RAG Knowledge Base</div>
            </div>
          </div>
          <button id="chatbot-close-btn" style="background: none; border: none; cursor: pointer; color: var(--text-muted);">&times;</button>
        </div>

        <!-- Messages Area -->
        <div id="chatbot-messages" style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: white;">
          <div style="align-self: flex-start; max-width: 85%; background: var(--surface-hover); border: 1px solid var(--border-color); padding: 10px 14px; border-radius: 12px; border-bottom-left-radius: 2px; font-size: 0.85rem; line-height: 1.4; color: var(--text-primary);">
            Hello! Ask me any question about the Indian Standards in our knowledge base. (e.g. "What is the requirement for impact resistance?")
          </div>
        </div>

        <!-- Input Area -->
        <div style="padding: 12px; border-top: 1px solid var(--border-color); background: var(--bg-main); display: flex; gap: 8px;">
          <input type="text" id="chatbot-input" placeholder="Ask a question..." style="flex: 1; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 0.85rem; outline: none;">
          <button id="chatbot-send-btn" style="background: var(--primary-blue); color: white; border: none; border-radius: 8px; padding: 0 12px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  const toggleBtn = document.getElementById('chatbot-toggle-btn');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const windowEl = document.getElementById('chatbot-window');
  const inputEl = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send-btn');
  const messagesEl = document.getElementById('chatbot-messages');

  let isOpen = false;

  const toggleChat = () => {
    isOpen = !isOpen;
    if (isOpen) {
      windowEl.style.display = 'flex';
      toggleBtn.style.transform = 'scale(0)';
      inputEl.focus();
    } else {
      windowEl.style.display = 'none';
      toggleBtn.style.transform = 'scale(1)';
    }
  };

  toggleBtn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  const addMessage = (text, isUser, citations = []) => {
    const msgDiv = document.createElement('div');
    msgDiv.style.alignSelf = isUser ? 'flex-end' : 'flex-start';
    msgDiv.style.maxWidth = '85%';
    
    let contentHtml = `
      <div style="background: ${isUser ? 'var(--primary-blue)' : 'var(--surface-hover)'}; 
                  color: ${isUser ? 'white' : 'var(--text-primary)'}; 
                  border: ${isUser ? 'none' : '1px solid var(--border-color)'}; 
                  padding: 10px 14px; 
                  border-radius: 12px; 
                  border-bottom-${isUser ? 'right' : 'left'}-radius: 2px; 
                  font-size: 0.85rem; 
                  line-height: 1.4;">
        ${text}
      </div>
    `;

    if (citations && citations.length > 0) {
      contentHtml += '<div style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px; width: 100%;">';
      citations.forEach(cit => {
        contentHtml += `
          <div style="background: var(--primary-blue-light); border: 1px solid rgba(11, 92, 173, 0.2); padding: 8px; border-radius: 6px; font-size: 0.75rem;">
            <div style="color: var(--primary-blue); font-weight: 700; margin-bottom: 4px;">${cit.is_number} (${cit.source})</div>
            <div style="color: var(--text-secondary); font-style: italic;">"${cit.text.substring(0, 100)}..."</div>
          </div>
        `;
      });
      contentHtml += '</div>';
    }

    msgDiv.innerHTML = contentHtml;
    messagesEl.appendChild(msgDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  const handleSend = async () => {
    const query = inputEl.value.trim();
    if (!query) return;

    addMessage(query, true);
    inputEl.value = '';
    
    // Add loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'chatbot-loading';
    loadingDiv.style.alignSelf = 'flex-start';
    loadingDiv.innerHTML = '<div style="background: var(--surface-hover); border: 1px solid var(--border-color); padding: 8px 14px; border-radius: 12px; border-bottom-left-radius: 2px; font-size: 0.85rem; color: var(--text-muted);">Thinking...</div>';
    messagesEl.appendChild(loadingDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const response = await fetch('http://localhost:8000/api/v1/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const data = await response.json();
      loadingDiv.remove();
      addMessage(data.answer, false, data.citations);
    } catch (err) {
      loadingDiv.remove();
      addMessage("I couldn't reach the server. Make sure the RAG backend is running on port 8000.", false);
    }
  };

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}
