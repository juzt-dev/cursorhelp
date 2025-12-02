# Hướng dẫn tạo Repository trên GitHub cho Cursorhelp

## Bước 1: Chuẩn bị Git Repository

### Option A: Sử dụng GitHub CLI (Nhanh nhất)

```bash
cd /Users/Chuo/Downloads/claudekit-engineer-main

# Login GitHub CLI (nếu chưa login)
gh auth login

# Tạo repository và push code
gh repo create juzt-dev/cursorhelp --public --source=. --remote=origin --push
```

### Option B: Tạo thủ công trên GitHub Web

1. **Tạo repository trên GitHub:**
   - Truy cập: https://github.com/new
   - Owner: `juzt-dev`
   - Repository name: `cursorhelp`
   - Description: "Cursorhelp - AI-powered development kit for Cursor IDE"
   - Chọn Public hoặc Private
   - **KHÔNG** check "Initialize with README" (vì đã có code)
   - Click "Create repository"

2. **Push code lên GitHub:**

```bash
cd /Users/Chuo/Downloads/claudekit-engineer-main

# Kiểm tra git status
git status

# Nếu chưa có git init
git init
git branch -M main

# Add tất cả files
git add .

# Commit
git commit -m "Initial commit: Cursorhelp rebranded from ClaudeKit Engineer"

# Add remote (thay YOUR_USERNAME nếu khác)
git remote add origin https://github.com/juzt-dev/cursorhelp.git

# Push lên GitHub
git push -u origin main
```

## Bước 2: Verify Repository

Sau khi push, kiểm tra:

```bash
# Kiểm tra remote
git remote -v

# Kiểm tra branch
git branch

# Xem commit history
git log --oneline
```

## Bước 3: Test CLI với Repository mới

Sau khi repository đã có trên GitHub:

```bash
# Test update command
cd /path/to/test-project
cursorhelp update

# Test new command
cursorhelp new --dir test-project
```

## Troubleshooting

### Lỗi: "repository already exists"
- Repository đã tồn tại, chỉ cần push code:
```bash
git remote add origin https://github.com/juzt-dev/cursorhelp.git
git push -u origin main
```

### Lỗi: "authentication failed"
- Cần setup GitHub authentication:
```bash
# Sử dụng Personal Access Token
git remote set-url origin https://YOUR_TOKEN@github.com/juzt-dev/cursorhelp.git

# Hoặc sử dụng SSH
git remote set-url origin git@github.com:juzt-dev/cursorhelp.git
```

### Lỗi: "branch main not found"
- Đảm bảo branch name đúng:
```bash
git branch -M main
git push -u origin main
```

## Lưu ý

- Đảm bảo `.gitignore` đã được cấu hình đúng
- Không commit sensitive files (.env, credentials, etc.)
- Kiểm tra `package.json` có đúng thông tin repository

