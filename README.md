## Table of contents
* [Instalacja](#instalacja)
* [Baza](#baza)
* [Uruchomienie](#uruchomienie)
 
### Aplikacja Webowa do nauki gry w szachy w oparcie o technologię Node.js
 
#### Instalacja

Na początku trzeba obowiązkowo pobrać i zainstalować środowisko wykonawcze Node.js bezpośrednio ze strony https://nodejs.org/en/. Aby uruchomić serwer, zostały utworzone specjalne skrypty w package.json . Na początku przechodzimy do katalogu serwer - z poziomu konsoli „cd serwer”, a następnie przeprowadzamy instalacje bibliotek zdefiniowanych w naszym pliku ze skryptami poleceniem „npm install”.


#### Baza

Przed uruchomieniem aplikacji wraz z bazą danych musimy stworzyć w folderze app plik o nazwie 

```
.env
```
Następnie należy otworzyć ten plik i wypełnić pola następującymi danymi

```
PORT=8080 (opcjonalne)
DATABASE_URL=mongodb+srv://kwiatkowskiw:1234567890@cluster0.alego.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

#### Uruchomienie

Kiedy nasze pakiety zostaną zainstalowane, możemy przejść do uruchomienia serwera komendą „npm start”. Serwer zostaje uruchomiony domyślnie na porcie 5000, oraz dostajemy informację, czy została włączona domyślnie ustawiona baza danych. Wątek dotyczący zmiany tych dwóch parametrów został poruszony w podrozdziale 4.1. Aby otworzyć aplikację wpisujemy w przeglądarce internetowej następujący adres: http://localhost:5000/.





