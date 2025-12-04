import React, { useState } from "react";

/**
 * Adding.jsx
 * Simple TailwindCSS-powered form UI for adding a book.
 * Place this file in: client/book/components/Adding.jsx
 *
 * Usage:
 * <Adding onAdd={(book) => console.log(book)} />
 */

export default function Adding() {
    const [form, setForm] = useState({
        title: "",
        author: "",
        year : ""
    });
    const [coverPreview, setCoverPreview] = useState("");
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
        

    }
    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setStatus({ loading: true });

        const newBook =
        {
            title: form.title,
            author: form.author,
            year: form.year,
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBook),
            });

            if (!response.ok) throw new Error("Failed to add book");

            const result = await response.json();
            setStatus({ success: "Book added successfully!" });
            
        } catch (error) {
            console.error(error)
              setStatus({ error: "Book could not be added!" });
        }
    }

    const reset =() =>
    {
        setForm({ title: "", author: "", year: "" });
        setStatus(null)
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Add a Book</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            required
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Author</label>
                            <input
                                name="author"
                                value={form.author}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm"
                               
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Year</label>
                            <input
                                name="year"
                                value={form.year}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm"
                              
                            />
                        </div>
                    </div>

             

                    <div className="flex items-center space-x-3 pt-2">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-60"
                            disabled={status?.loading}
                        >
                            {status?.loading ? "Saving..." : "Add Book"}
                        </button>
                        <button
                            type="button"
                            onClick={reset}
                            className="px-4 py-2 border rounded-md text-sm"
                        >
                            Reset
                        </button>

                        {status?.success && <span className="text-green-600 text-sm">{status.success}</span>}
                        {status?.error && <span className="text-red-600 text-sm">{status.error}</span>}
                    </div>
                </div>

                <aside className="md:col-span-1">
                    <div className="border rounded-md p-4 bg-white shadow-sm">
                        <h3 className="font-medium mb-3 text-sm">Preview</h3>

                        <div className="flex flex-col items-center">
                            <div className="w-40 h-56 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center border">
                                {coverPreview ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={coverPreview} alt="cover preview" className="object-cover w-full h-full" />
                                ) : (
                                    <span className="text-xs text-gray-400">No cover</span>
                                )}
                            </div>

                            <div className="mt-3 text-center">
                                <h4 className="font-semibold">{form.title || "Untitled"}</h4>
                                <p className="text-sm text-gray-500">{form.author || "Unknown author"}</p>
                                <p className="text-sm text-gray-400 mt-2">{form.year || "Year"}</p>
                               
                            </div>
                        </div>

                    
                    </div>
                </aside>
            </form>
        </div>
    );
}