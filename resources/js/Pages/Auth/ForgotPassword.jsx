import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="نسيت كلمة المرور" />

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                {/* Logo / Icon */}
                <div className="flex justify-center mb-6">
                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-2xl">
                        🔐
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-extrabold text-gray-800 text-center mb-2">
                    نسيت كلمة المرور؟
                </h1>

                <p className="text-sm text-gray-500 text-center mb-6">
                    أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
                </p>

                {/* Status */}
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 text-center">
                        {status}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={submit} className="space-y-5">

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            البريد الإلكتروني
                        </label>

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <PrimaryButton
                        className="w-full justify-center py-3 text-base"
                        disabled={processing}
                    >
                        إرسال رابط إعادة التعيين
                    </PrimaryButton>
                </form>

                {/* Back to login */}
                <div className="mt-6 text-center">
                    <a
                        href={route('login')}
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        العودة إلى تسجيل الدخول
                    </a>
                </div>
            </div>
        </GuestLayout>
    );
}
