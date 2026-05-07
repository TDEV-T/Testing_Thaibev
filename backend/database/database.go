package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/microsoft/go-mssqldb"
)

var DB *sql.DB

func InitDB() {
	dbHost := os.Getenv("DB_HOST")
	if dbHost == "" {
		dbHost = "localhost"
	}
	dbPort := os.Getenv("DB_PORT")
	if dbPort == "" {
		dbPort = "1433"
	}
	dbUser := os.Getenv("DB_USER")
	if dbUser == "" {
		dbUser = "sa"
	}
	dbPass := os.Getenv("DB_PASSWORD")

	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%s;encrypt=disable",
		dbHost, dbUser, dbPass, dbPort)

	var err error
	DB, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal("Error creating connection pool: ", err.Error())
	}

	query := `
	IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Questions' AND xtype='U')
	CREATE TABLE Questions (
		ID INT IDENTITY(1,1) PRIMARY KEY,
		Text NVARCHAR(MAX) NOT NULL,
		Option1 NVARCHAR(MAX) NOT NULL,
		Option2 NVARCHAR(MAX) NOT NULL,
		Option3 NVARCHAR(MAX) NOT NULL,
		Option4 NVARCHAR(MAX) NOT NULL,
		SequenceNumber INT NOT NULL
	)`
	_, err = DB.Exec(query)
	if err != nil {
		log.Fatal("Error creating table: ", err.Error())
	}
}
