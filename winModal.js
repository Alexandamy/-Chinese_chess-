// 获胜弹窗组件，独立文件
let modalContainer = null;

// 创建弹窗DOM
function createModal() {
    if (modalContainer) return;
    
    // 遮罩层
    modalContainer = document.createElement('div');
    modalContainer.id = 'winModal';
    modalContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        font-family: "楷体", "KaiTi", serif;
    `;
    
    // 弹窗内容
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: #e6d2b3;
        padding: 40px 60px;
        border-radius: 8px;
        border: 8px solid #7a4b20;
        text-align: center;
        box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    `;
    
    // 获胜文本
    const winText = document.createElement('div');
    winText.id = 'winText';
    winText.style.cssText = `
        font-size: 36px;
        font-weight: bold;
        color: #7a4b20;
        margin-bottom: 30px;
    `;
    modalContent.appendChild(winText);
    
    // 确认按钮
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = '再来一局';
    confirmBtn.style.cssText = `
        padding: 12px 30px;
        font-size: 20px;
        font-family: "楷体", "KaiTi", serif;
        background: #b81212;
        color: white;
        border: 3px solid #7a0000;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
    `;
    confirmBtn.onmouseover = () => {
        confirmBtn.style.background = '#ff5c5c';
    };
    confirmBtn.onmouseout = () => {
        confirmBtn.style.background = '#b81212';
    };
    confirmBtn.onclick = hideWinModal;
    modalContent.appendChild(confirmBtn);
    
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
}

// 显示获胜弹窗
function showWinModal(winner) {
    if (!modalContainer) createModal();
    
    const winTextEl = document.getElementById('winText');
    winTextEl.textContent = `恭喜${winner}获胜！`;
    modalContainer.style.display = 'flex';
}

// 隐藏弹窗并重置游戏
function hideWinModal() {
    modalContainer.style.display = 'none';
    initBoard();
    renderBoard();
    selectedPiece = null;
    currentPlayer = 'red';
}

// 页面加载完成创建弹窗
window.addEventListener('DOMContentLoaded', createModal);