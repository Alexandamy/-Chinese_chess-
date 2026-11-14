// 判断走法是否合法
function isValidMove(fromRow, fromCol, toRow, toCol) {
    const piece = board[fromRow][fromCol];
    const target = board[toRow][toCol];
    
    // 目标位置是己方棋子，不能走
    if (target && target.color === piece.color) {
        return false;
    }
    
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    
    switch (piece.type) {
        case '帅':
        case '将':
            // 只能走一步，横竖
            if (rowDiff + colDiff !== 1) return false;
            // 不能出九宫
            if (piece.color === 'red') {
                if (toRow < 7 || toRow > 9 || toCol < 3 || toCol > 5) return false;
            } else {
                if (toRow < 0 || toRow > 2 || toCol < 3 || toCol > 5) return false;
            }
            // 检查将帅是否照面
            if (checkKingFaceToFace(fromRow, fromCol, toRow, toCol)) return false;
            return true;
        
        case '仕':
        case '士':
            // 斜走一步
            if (rowDiff !== 1 || colDiff !== 1) return false;
            // 不能出九宫
            if (piece.color === 'red') {
                if (toRow < 7 || toRow > 9 || toCol < 3 || toCol > 5) return false;
            } else {
                if (toRow < 0 || toRow > 2 || toCol < 3 || toCol > 5) return false;
            }
            return true;
        
        case '相':
        case '象':
            // 走田字
            if (rowDiff !== 2 || colDiff !== 2) return false;
            // 不能过河
            if (piece.color === 'red' && toRow < 5) return false;
            if (piece.color === 'black' && toRow > 4) return false;
            // 田字中心不能有棋子
            const midRow = (fromRow + toRow) / 2;
            const midCol = (fromCol + toCol) / 2;
            if (board[midRow][midCol]) return false;
            return true;
        
        case '车':
            // 走直线
            if (rowDiff !== 0 && colDiff !== 0) return false;
            // 中间不能有棋子
            if (rowDiff === 0) {
                // 横向
                const minCol = Math.min(fromCol, toCol);
                const maxCol = Math.max(fromCol, toCol);
                for (let col = minCol + 1; col < maxCol; col++) {
                    if (board[fromRow][col]) return false;
                }
            } else {
                // 纵向
                const minRow = Math.min(fromRow, toRow);
                const maxRow = Math.max(fromRow, toRow);
                for (let row = minRow + 1; row < maxRow; row++) {
                    if (board[row][fromCol]) return false;
                }
            }
            return true;
        
        case '马':
            // 走日字
            if (!((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2))) return false;
            // 蹩马腿
            if (rowDiff === 2) {
                // 纵向跳，蹩腿的位置是中间行，同列
                const midRow = fromRow + (toRow - fromRow) / 2;
                if (board[midRow][fromCol]) return false;
            } else {
                // 横向跳，蹩腿的位置是中间列，同行
                const midCol = fromCol + (toCol - fromCol) / 2;
                if (board[fromRow][midCol]) return false;
            }
            return true;

        case '炮':
            // 走直线
            if (rowDiff !== 0 && colDiff !== 0) return false;
            let count = 0;
            // 计算中间棋子数量
            if (rowDiff === 0) {
                const minCol = Math.min(fromCol, toCol);
                const maxCol = Math.max(fromCol, toCol);
                for (let col = minCol + 1; col < maxCol; col++) {
                    if (board[fromRow][col]) count++;
                }
            } else {
                const minRow = Math.min(fromRow, toRow);
                const maxRow = Math.max(fromRow, toRow);
                for (let row = minRow + 1; row < maxRow; row++) {
                    if (board[row][fromCol]) count++;
                }
            }
            // 不吃子：中间0个棋子；吃子：中间1个棋子
            if (!target && count === 0) return true;
            if (target && count === 1) return true;
            return false;
        
        case '兵':
        case '卒':
            // 只能往前走
            const isRed = piece.color === 'red';
            const forward = isRed ? -1 : 1;
            // 没过河
            const isCrossRiver = isRed ? (fromRow < 5) : (fromRow > 4);
            if (!isCrossRiver) {
                // 只能前进一步
                if (toRow - fromRow !== forward || colDiff !== 0) return false;
            } else {
                // 过河了，可以前进或者左右走一步，不能后退
                if (toRow - fromRow === forward && colDiff === 0) return true;
                if (rowDiff === 0 && colDiff === 1) return true;
                return false;
            }
            return true;
        
        default:
            return false;
    }
}

// 检查将帅是否照面
function checkKingFaceToFace(fromRow, fromCol, toRow, toCol) {
    // 先模拟移动
    const temp = board[toRow][toCol];
    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = null;
    
    // 找到红帅和黑将的位置
    let redKing = null, blackKing = null;
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 9; col++) {
            const p = board[row][col];
            if (p && p.type === '帅') redKing = p;
            if (p && p.type === '将') blackKing = p;
        }
    }
    
    let faceToFace = false;
    // 同一列
    if (redKing.col === blackKing.col) {
        const minRow = Math.min(redKing.row, blackKing.row);
        const maxRow = Math.max(redKing.row, blackKing.row);
        let hasPiece = false;
        for (let row = minRow + 1; row < maxRow; row++) {
            if (board[row][redKing.col]) {
                hasPiece = true;
                break;
            }
        }
        faceToFace = !hasPiece;
    }
    
    // 恢复棋盘
    board[fromRow][fromCol] = board[toRow][toCol];
    board[toRow][toCol] = temp;
    
    return faceToFace;
}

// 判断是否将帅被吃掉
function checkKingEaten() {
    let hasRedKing = false, hasBlackKing = false;
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 9; col++) {
            const p = board[row][col];
            if (p && p.type === '帅') hasRedKing = true;
            if (p && p.type === '将') hasBlackKing = true;
        }
    }
    if (!hasRedKing) return '黑方';
    if (!hasBlackKing) return '红方';
    return null;
}

// 判断是否将死
function isCheckmate(color) {
    // 遍历所有己方棋子，看是否有合法走法
    for (let fromRow = 0; fromRow < 10; fromRow++) {
        for (let fromCol = 0; fromCol < 9; fromCol++) {
            const piece = board[fromRow][fromCol];
            if (piece && piece.color === color) {
                // 遍历所有可能的落子位置
                for (let toRow = 0; toRow < 10; toRow++) {
                    for (let toCol = 0; toCol < 9; toCol++) {
                        if (isValidMove(fromRow, fromCol, toRow, toCol)) {
                            // 有合法走法，没被将死
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
}