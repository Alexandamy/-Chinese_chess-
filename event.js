// 绑定点击事件
function initEvents() {
    const boardEl = document.getElementById('chessBoard');
    
    boardEl.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.classList.contains('chess-piece') && target.id !== 'pieceContainer' && !target.classList.contains('board-line') && !target.classList.contains('river') && !target.classList.contains('palace')) return;
        
        // 点击的是棋子
        if (target.classList.contains('chess-piece')) {
            const row = parseInt(target.dataset.row);
            const col = parseInt(target.dataset.col);
            const piece = board[row][col];
            
            // 没有选中棋子，且点击的是当前方的棋子，选中
            if (!selectedPiece && piece.color === currentPlayer) {
                selectedPiece = { row, col };
                renderBoard();
                return;
            }
            
            // 已经选中棋子，点击的是己方棋子，切换选中
            if (selectedPiece && piece.color === currentPlayer) {
                selectedPiece = { row, col };
                renderBoard();
                return;
            }
            
            // 已经选中棋子，点击的是对方棋子或者空位置，尝试走棋
            if (selectedPiece) {
                if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
                    // 移动棋子
                    board[row][col] = board[selectedPiece.row][selectedPiece.col];
                    board[row][col].row = row;
                    board[row][col].col = col;
                    board[selectedPiece.row][selectedPiece.col] = null;
                    selectedPiece = null;
                    // 切换走棋方
                    currentPlayer = currentPlayer === 'red' ? 'black' : 'red';
                    renderBoard();
                    
                    // 检查是否将帅被吃
                    const winner = checkKingEaten();
                    if (winner) {
                        showWinModal(winner);
                        return;
                    }
                    
                    // 检查是否将死
                    if (isCheckmate(currentPlayer)) {
                        const winSide = currentPlayer === 'red' ? '黑方' : '红方';
                        showWinModal(winSide);
                        return;
                    }
                    return;
                }
            }
        }
        
        // 点击的是空位置，尝试落子
        if (selectedPiece) {
            // 计算点击的位置对应的行列
            const rect = boardEl.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const col = Math.round(x / 60);
            const row = Math.round(y / 60);
            
            // 行列合法
            if (col >= 0 && col < 9 && row >=0 && row < 10) {
                if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
                    // 移动棋子
                    board[row][col] = board[selectedPiece.row][selectedPiece.col];
                    board[row][col].row = row;
                    board[row][col].col = col;
                    board[selectedPiece.row][selectedPiece.col] = null;
                    selectedPiece = null;
                    // 切换走棋方
                    currentPlayer = currentPlayer === 'red' ? 'black' : 'red';
                    renderBoard();
                    
                    // 检查是否将帅被吃
                    const winner = checkKingEaten();
                    if (winner) {
                        showWinModal(winner);
                        return;
                    }
                    
                    // 检查是否将死
                    if (isCheckmate(currentPlayer)) {
                        const winSide = currentPlayer === 'red' ? '黑方' : '红方';
                        showWinModal(winSide);
                        return;
                    }
                    return;
                }
            }
        }
    });
}

// 初始化游戏
window.onload = function() {
    initBoard();
    renderBoard();
    initEvents();
}