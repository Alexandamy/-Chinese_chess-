// 渲染棋盘棋子
function renderBoard() {
    const container = document.getElementById('pieceContainer');
    container.innerHTML = '';
    
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 9; col++) {
            const piece = board[row][col];
            if (piece) {
                const pieceEl = document.createElement('div');
                pieceEl.className = `chess-piece ${piece.color}`;
                pieceEl.textContent = piece.type;
                // 棋子直径54px，中心对齐线交叉点(col*60, row*60)，所以左移27px 上移27px
                pieceEl.style.left = `${col * 60 - 27}px`;
                pieceEl.style.top = `${row * 60 - 27}px`;
                // 记录坐标
                pieceEl.dataset.row = row;
                pieceEl.dataset.col = col;
                // 选中状态
                if (selectedPiece && selectedPiece.row === row && selectedPiece.col === col) {
                    pieceEl.classList.add('selected');
                }
                container.appendChild(pieceEl);
            }
        }
    }
}