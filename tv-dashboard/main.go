package main

import (
	"html/template"
	"log"
	"net/http"
	"path/filepath"
)

type Signal struct {
	CoinName     string
	TimeInterval string
	SignalName   string
	SignalType   string
}

type PageData struct {
	Signals []Signal
}

func main() {
	// Подгружаем шаблон
	tmpl := template.Must(template.ParseFiles(filepath.Join("templates", "index.html")))

	// Обработчик для /
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		data := PageData{
			Signals: []Signal{
				{"BTCUSDT", "15m", "MACD+RSI", "BUY"},
				{"ETHUSDT", "30m", "RSI", "SELL"},
			},
		}
		if err := tmpl.Execute(w, data); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})

	// Обслуживание статики
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets"))))

	log.Println("Server started at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
