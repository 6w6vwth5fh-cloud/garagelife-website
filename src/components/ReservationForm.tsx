import { useState } from 'react';
import { Check } from 'lucide-react';

type Language = 'en' | 'ja';

interface ReservationFormProps {
  lang: Language;
}

export const ReservationForm = ({ lang }: ReservationFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const labels = {
    en: {
      title: 'Make a Reservation',
      subtitle: 'Groups of 3+ please book ahead. We\'ll confirm via Instagram DM.',
      name: 'Your Name',
      email: 'Email',
      phone: 'Phone Number',
      date: 'Preferred Date',
      time: 'Preferred Time',
      guests: 'Number of Guests',
      message: 'Special Requests',
      submit: 'Send Reservation',
      submitting: 'Sending...',
      success: 'Reservation request sent!',
      successMsg: 'We\'ll contact you soon via Instagram DM or email.'
    },
    ja: {
      title: 'ご予約',
      subtitle: '3名以上のグループの場合、事前にご予約をお願いします。Instagram DMでご確認させていただきます。',
      name: 'お名前',
      email: 'メールアドレス',
      phone: '電話番号',
      date: 'ご予約希望日',
      time: 'ご予約希望時間',
      guests: 'ご利用人数',
      message: 'ご要望・ご質問',
      submit: 'ご予約を送信',
      submitting: '送信中...',
      success: 'ご予約のお申し込みが完了しました',
      successMsg: 'Instagram DMまたはメールでご確認させていただきます。'
    }
  };

  const t = labels[lang];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);

      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/mgvwddno', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form
        (e.target as HTMLFormElement).reset();
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(lang === 'en' ? 'Failed to send reservation. Please try again.' : '送信に失敗しました。もう一度お試しください。');
      }
    } catch (err) {
      setError(lang === 'en' ? 'An error occurred. Please try again.' : 'エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border-4 border-green-600 p-12 rounded text-center">
        <div className="flex justify-center mb-6">
          <Check className="w-16 h-16 text-green-600" />
        </div>
        <h3 className="font-display text-3xl text-green-600 mb-4">{t.success}</h3>
        <p className="text-ink/80 text-lg max-w-md mx-auto">
          {t.successMsg}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-display text-4xl sm:text-5xl mb-4 uppercase">
          {t.title}
        </h2>
        <p className="text-ink/70 text-base sm:text-lg max-w-xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-cream-dark border-4 border-ink p-8 rounded space-y-6 shadow-[8px_8px_0_theme(colors.ink)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold text-sm mb-2">{t.name}</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 border-2 border-ink rounded bg-white focus:outline-none focus:ring-2 focus:ring-diner-red"
              placeholder={lang === 'en' ? 'John Doe' : '田中太郎'}
            />
          </div>
          <div>
            <label className="block font-bold text-sm mb-2">{t.email}</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border-2 border-ink rounded bg-white focus:outline-none focus:ring-2 focus:ring-diner-red"
              placeholder="example@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold text-sm mb-2">{t.phone}</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full px-4 py-3 border-2 border-ink rounded bg-white focus:outline-none focus:ring-2 focus:ring-diner-red"
              placeholder={lang === 'en' ? '+81 90-1234-5678' : '09012345678'}
            />
          </div>
          <div>
            <label className="block font-bold text-sm mb-2">{t.guests}</label>
            <input
              type="number"
              name="guests"
              required
              min="1"
              max="20"
              className="w-full px-4 py-3 border-2 border-ink rounded bg-white focus:outline-none focus:ring-2 focus:ring-diner-red"
              placeholder="3"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold text-sm mb-2">{t.date}</label>
            <input
              type="date"
              name="date"
              required
              className="w-full px-4 py-3 border-2 border-ink rounded bg-white focus:outline-none focus:ring-2 focus:ring-diner-red"
            />
          </div>
          <div>
            <label className="block font-bold text-sm mb-2">{t.time}</label>
            <input
              type="time"
              name="time"
              required
              className="w-full px-4 py-3 border-2 border-ink rounded bg-white focus:outline-none focus:ring-2 focus:ring-diner-red"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-sm mb-2">{t.message}</label>
          <textarea
            name="message"
            rows={4}
            className="w-full px-4 py-3 border-2 border-ink rounded bg-white focus:outline-none focus:ring-2 focus:ring-diner-red resize-none"
            placeholder={lang === 'en' ? 'Any special requests...' : 'ご要望などございましたら...'}
          />
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-600 text-red-600 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-diner-red text-white border-3 border-ink px-8 py-4 font-display tracking-widest uppercase rounded font-bold transition-all disabled:opacity-50 hover:disabled:shadow-none hover:shadow-[6px_6px_0_theme(colors.ink)] active:shadow-[2px_2px_0_theme(colors.ink)]"
        >
          {isLoading ? t.submitting : t.submit}
        </button>
      </form>

      <p className="text-center text-xs text-ink/50 mt-6 font-bungee tracking-widest">
        {lang === 'en'
          ? 'We will contact you via Instagram DM after receiving your reservation request.'
          : 'ご予約申込後、Instagram DMでご確認させていただきます。'}
      </p>
    </div>
  );
};
