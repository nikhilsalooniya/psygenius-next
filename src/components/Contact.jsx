'use client'

import { useState } from "react";

const API_BASE = "https://api.psygenius.mentoragenius.de";

export default function Contact() {
    const [status, setStatus] = useState('idle');

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus("submitting");

        const formData = new FormData(event.currentTarget);
        const body = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch(`${API_BASE}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (data.success) {
                setStatus("success");
                event.target.reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    return (
        <div id="contact-section" className="isolate relative z-40 overflow-clip bg-violet-50 px-6 py-24 sm:py-32 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Kontaktformular</h2>
                <p className="mt-2 text-lg/8 text-gray-600">Hast du Fragen oder Feedback? Schreib uns einfach.</p>
            </div>
            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
                            Name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                            E-Mail
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                            Nachricht
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                required
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                defaultValue={''}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        disabled={status === 'submitting' || status === 'success'}
                        className={
                            (status === 'idle' ? "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 cursor-pointer " : "") +
                            (status === 'submitting' ? "bg-gray-400 cursor-not-allowed " : "") +
                            (status === 'success' ? "bg-green-600 cursor-not-allowed " : "") +
                            (status === 'error' ? "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600 cursor-pointer " : "") +
                            `block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors`
                        }
                        onClick={status === 'error' ? () => setStatus('idle') : undefined}
                    >
                        {status === 'idle' && "Nachricht senden"}
                        {status === 'submitting' && "Wird gesendet…"}
                        {status === 'success' && "Nachricht gesendet!"}
                        {status === 'error' && "Erneut versuchen"}
                    </button>
                </div>
                {status === 'success' && (
                    <p className="mt-4 text-center text-sm text-green-600">
                        Danke! Wir melden uns bald bei dir.
                    </p>
                )}
                {status === 'error' && (
                    <p className="mt-4 text-center text-sm text-red-600">
                        Etwas ist schiefgelaufen. Bitte versuche es erneut.
                    </p>
                )}
            </form>
        </div>
    )
}
