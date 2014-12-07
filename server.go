package main

import (
	"compress/zlib"
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/upload", func(w http.ResponseWriter, r *http.Request) {
		reader, err := zlib.NewReader(r.Body)
		if err != nil {
			log.Println(err)
			return
		}
		io.Copy(w, reader)
	})
	http.Handle("/", http.FileServer(http.Dir(".")))

	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "3000"
	}
	log.Println("Listen on " + port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal(err)
	}

}
