# webapp
Web App网站

## 安装

```
pip install requirements/dev.txt
```

## 数据库同步

```
python manage.py db migrate -m "initial migration"
python manage.py db upgrade
```

## 运行
```
python manage.py runserver
```
