package main

import (
	"compress/zlib"
	"io"
	"log"
	"net/http"
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

	log.Println("Listen on 3000")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}

}
