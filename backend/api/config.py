class Config():
    SQLALCHEMY_DATABASE_URI = 'postgresql://myuser:mypass@localhost:5432/mydb'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TRAP_HTTP_EXCEPTIONS = True
    PROPAGATE_EXCEPTIONS = True