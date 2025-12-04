
import React, { useState, useEffect } from "react";



        /**
         * BookSearchee component (Tailwind CSS)
         * - asks user for book title and year published
         * - fetches matching book from an API endpoint
         * - displays a card for the found book or a list of all books
         *
         * Save as: /C:/Users/hp/OneDrive/Desktop/projects/BookProject/client/book/components/book.jsx
         */
 export default function BookSearchee() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [found, setFound] = useState(null);
    const [allBooks, setAllBooks] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

            async function handleSearch(e) {
                e.preventDefault();
                setMessage("");
                setFound(null);

                const q = title.trim();
                const y = year.trim();

                if (!q) {
                    setMessage("Please enter a book title to search.");
                    return;
                }

                setLoading(true);
                try {
                    const params = new URLSearchParams({ title: q, year: y });
                    // adjust this URL to match your backend route
                    const res = await fetch(`/api/books?${params.toString()}`);
                    if (!res.ok) {
                        throw new Error(`Server error: ${res.status}`);
                    }
                    const data = await res.json();

                    // Accept either an array of matches or a single object
                    let book = null;
                    if (Array.isArray(data)) {
                        book = data[0] || null;
                    } else if (data && typeof data === "object") {
                        book = data.book ?? data;
                    }

                    if (book) {
                        setFound(book);
                    } else {
                        setMessage("No book found matching that title and year.");
                    }
                } catch (err) {
                    setMessage("Error fetching book. Please try again.");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }

            function clearForm() {
                // clear fields and results
                setTitle("");
                setYear("");
                setFound(null);
                setAllBooks([]);
                setMessage("");
            }

            async function getAllBooks() {
                setMessage("");
                setAllBooks([]);
                setFound(null);
                setLoading(true);
                try {
                    const res = await fetch("http://127.0.0.1:8000/api/books/");
                    if (!res.ok) {
                        throw new Error(`Server error: ${res.status}`);
                    }
                    const data = await res.json();
                    // normalize to array
                    const list = Array.isArray(data) ? data : data && data.books ? data.books : data ? [data] : [];
                    if (list.length === 0) {
                        setMessage("No books available.");
                    } else {
                        setAllBooks(list);
                    }
                } catch (err) {
                    setMessage("Error fetching books. Please try again.");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }

            // useEffect: fetch all books on mount (optional). Keeps title clearing separate.
            useEffect(() => {
               
                 getAllBooks();
                 
                 setTitle("");
            }, []);

            return (
                <div className="max-w-2xl mx-auto mt-6 font-sans">
                    <form
                        onSubmit={handleSearch}
                        className="flex gap-2 mb-4 flex-wrap items-center"
                        aria-label="Book search form"
                    >
                        <input
                            className="px-3 py-2 text-sm flex-1 min-w-[220px] border rounded"
                            placeholder="Book title (required)"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            aria-label="Book title"
                        />
                        <input
                            className="px-3 py-2 text-sm flex-1 min-w-[120px] border rounded"
                            placeholder="Year published (optional)"
                            value={year}
                            onChange={(e) => setYear(e.target.value.replace(/[^\d]/g, ""))}
                            aria-label="Year published"
                            maxLength={4}
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                            disabled={loading}
                        >
                            {loading ? "Searching..." : "Search"}
                        </button>
                        <button
                            type="button"
                            onClick={clearForm}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={getAllBooks}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Get All"}
                        </button>
                    </form>

                    {message && <div className="text-red-600 mb-3">{message}</div>}

                    {found && (
                        <article
                            className="flex gap-4 p-4 border rounded bg-white shadow-sm items-start mb-4"
                            aria-live="polite"
                        >
                            {found.cover ? (
                                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                <img
                                    src={found.cover}
                                    alt={`${found.title} cover`}
                                    className="w-24 h-36 object-cover rounded bg-gray-100"
                                />
                            ) : (
                                <div className="w-24 h-36 rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                                    No cover
                                </div>
                            )}

                            <div className="flex-1">
                                <h3 className="text-lg font-semibold m-0">{found.title}</h3>
                                <div className="text-sm text-gray-600 mt-1">
                                    {found.author} {found.year ? `• ${found.year}` : ""}
                                </div>
                                {found.description && (
                                    <p className="mt-2 text-gray-800">{found.description}</p>
                                )}
                            </div>
                        </article>
                    )}

                    {allBooks.length > 0 && (
                        <section aria-live="polite">
                            <h2 className="text-xl font-semibold mb-3">All Books</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {allBooks.map(b => (
                                    <article key={b.id} className="p-3 border rounded bg-white shadow-sm">
                                        <div className="flex items-start gap-3">
                                            {b.cover ? (
                                                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                                <img src={b.cover} alt={`${b.title} cover`} className="w-20 h-28 object-cover rounded bg-gray-100" />
                                            ) : (
                                                <div className="w-20 h-28 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                                                    No cover
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-semibold">{b.title}</h3>
                                                <div className="text-sm text-gray-600">
                                                    {b.author} {b.year ? `• ${b.year}` : ""}
                                                </div>
                                              
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            );
        }

