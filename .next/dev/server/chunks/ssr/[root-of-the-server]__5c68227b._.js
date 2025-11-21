module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/CPS714-Section3/lib/supabaseClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertSupabaseConfigured",
    ()=>assertSupabaseConfigured,
    "getSupabaseClient",
    ()=>getSupabaseClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/CPS714-Section3/node_modules/@supabase/supabase-js/dist/module/index.js [app-ssr] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://kccuncyihemwveazpebe.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjY3VuY3lpaGVtd3ZlYXpwZWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzU2NDUsImV4cCI6MjA3OTE1MTY0NX0.1jIfQ_i1z0OwRQBflrKm0ZliUJgOQ19BjpYBF8u71T4");
let client = null;
function assertSupabaseConfigured() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
function getSupabaseClient() {
    if (!client) {
        assertSupabaseConfigured();
        client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
    }
    return client;
}
}),
"[project]/Downloads/CPS714-Section3/lib/onboarding.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensureProfileAndMembership",
    ()=>ensureProfileAndMembership
]);
function normalizeMetadata(userMetadata, formData) {
    const metaGoals = Array.isArray(userMetadata?.goals) ? userMetadata.goals : undefined;
    return {
        full_name: formData?.fullName ?? userMetadata?.full_name ?? "",
        address: formData?.address ?? userMetadata?.address ?? "",
        contact_number: formData?.contactNumber ?? userMetadata?.contact_number ?? "",
        emergency_contact: formData?.emergencyContact ?? userMetadata?.emergency_contact ?? "",
        goals: formData?.goals ?? metaGoals ?? [],
        membership_tier: formData?.tier ?? userMetadata?.membership_tier ?? ""
    };
}
async function ensureProfileAndMembership({ supabase, user, formData }) {
    const { full_name, address, contact_number, emergency_contact, goals, membership_tier } = normalizeMetadata(user.user_metadata, formData);
    // Guard against missing tier (we'll still create profile without membership)
    const tier = membership_tier?.toLowerCase();
    // Ensure profile exists
    const { data: existingProfile, error: profileCheckError } = await supabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
    if (profileCheckError && profileCheckError.code !== "PGRST116") {
        throw profileCheckError;
    }
    if (!existingProfile) {
        const { error: profileInsertError } = await supabase.from("profiles").insert({
            id: user.id,
            full_name: full_name || user.email,
            address,
            contact_number,
            emergency_contact,
            goals: goals ?? []
        });
        if (profileInsertError) {
            throw profileInsertError;
        }
    }
    if (tier) {
        const { data: existingMembership, error: membershipCheckError } = await supabase.from("memberships").select("id").eq("user_id", user.id).maybeSingle();
        if (membershipCheckError && membershipCheckError.code !== "PGRST116") {
            throw membershipCheckError;
        }
        if (!existingMembership) {
            const { error: membershipInsertError } = await supabase.from("memberships").insert({
                user_id: user.id,
                tier,
                status: "active"
            });
            if (membershipInsertError) {
                throw membershipInsertError;
            }
        }
    }
}
}),
"[project]/Downloads/CPS714-Section3/app/register/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/CPS714-Section3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/CPS714-Section3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/CPS714-Section3/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/CPS714-Section3/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/CPS714-Section3/lib/supabaseClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$lib$2f$onboarding$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/CPS714-Section3/lib/onboarding.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const fitnessGoals = [
    "Weight Loss",
    "Muscle Gain",
    "Strength Training",
    "Endurance",
    "Mobility",
    "Flexibility",
    "Cardio Health",
    "Posture Correction",
    "Core Stability",
    "Stress Relief",
    "Rehabilitation",
    "General Wellness",
    "Functional Training",
    "Bodybuilding",
    "CrossFit",
    "Pilates",
    "Yoga",
    "HIIT",
    "Zumba",
    "Powerlifting",
    "Injury Recovery",
    "Balance Improvement",
    "Marathon Prep",
    "Mind-Body Connection",
    "Athletic Conditioning",
    "Dance Fitness",
    "Prenatal Fitness",
    "Senior Wellness",
    "Postnatal Recovery",
    "Self-Defense",
    "Boxing",
    "Cycling",
    "Rowing",
    "Group Training",
    "Nutrition Focus"
];
const tiers = [
    {
        name: "Basic",
        price: "$29 / mo",
        tagline: "Essential access to the full gym experience."
    },
    {
        name: "Premium",
        price: "$59 / mo",
        tagline: "Personalized training and unlimited group sessions."
    },
    {
        name: "VIP",
        price: "$99 / mo",
        tagline: "Elite privileges with 24/7 access and luxury benefits."
    }
];
function RegisterPage() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const planParam = searchParams.get("plan");
    const [selectedGoals, setSelectedGoals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [tier, setTier] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(planParam || "");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [fullName, setFullName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [address, setAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [contactNumber, setContactNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [emergencyContact, setEmergencyContact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    function toggleGoal(goal) {
        setSelectedGoals((prev)=>prev.includes(goal) ? prev.filter((g)=>g !== goal) : prev.length < 5 ? [
                ...prev,
                goal
            ] : prev);
    }
    const strength = password.length === 0 ? "" : password.length < 6 ? "Weak" : /[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password) ? "Strong" : "Medium";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "grid md:grid-cols-2 min-h-screen text-white relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "absolute top-6 left-6 flex items-center gap-2 text-yellow-300 hover:text-yellow-200 transition-all z-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 2,
                        stroke: "currentColor",
                        className: "w-5 h-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M15.75 19.5L8.25 12l7.5-7.5"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: "Back to Home"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative hidden md:block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        src: "/videos/register-luxury.mp4",
                        autoPlay: true,
                        muted: true,
                        loop: true,
                        playsInline: true,
                        className: "absolute inset-0 h-full w-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/60"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col justify-center px-6 py-12 md:px-12 bg-[#0A1128] relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-lg w-full mx-auto bg-white/10 border border-white/10 p-8 rounded-2xl backdrop-blur-lg shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold mb-2",
                            children: [
                                "Join ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#D4AF37]",
                                    children: "FitHub"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                    lineNumber: 141,
                                    columnNumber: 18
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-300 mb-6",
                            children: "Create your personalized luxury membership account"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            className: "space-y-4",
                            onSubmit: async (e)=>{
                                e.preventDefault();
                                setError(null);
                                setSuccess(null);
                                if (password !== confirmPassword) {
                                    setError("Passwords do not match.");
                                    return;
                                }
                                if (!tier) {
                                    setError("Please select a membership tier.");
                                    return;
                                }
                                setLoading(true);
                                try {
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertSupabaseConfigured"])();
                                    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
                                    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                                        email,
                                        password,
                                        options: {
                                            data: {
                                                full_name: fullName,
                                                address,
                                                contact_number: contactNumber,
                                                emergency_contact: emergencyContact,
                                                goals: selectedGoals,
                                                membership_tier: tier
                                            }
                                        }
                                    });
                                    if (signUpError) {
                                        setError(signUpError.message);
                                        setLoading(false);
                                        return;
                                    }
                                    const user = signUpData.user;
                                    if (!user) {
                                        setError("Sign up succeeded, but no user returned.");
                                        setLoading(false);
                                        return;
                                    }
                                    const formData = {
                                        fullName,
                                        address,
                                        contactNumber,
                                        emergencyContact,
                                        goals: selectedGoals,
                                        tier
                                    };
                                    let session = signUpData.session;
                                    if (!session) {
                                        // Try immediate sign-in (works when email confirmations are disabled)
                                        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                                            email,
                                            password
                                        });
                                        if (signInError || !signInData.session) {
                                            setSuccess("Account created! Please verify your email, then log in to finish onboarding.");
                                            return;
                                        }
                                        session = signInData.session;
                                    }
                                    if (!session) {
                                        setSuccess("Account created! Please verify your email, then log in to finish onboarding.");
                                        return;
                                    }
                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$lib$2f$onboarding$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensureProfileAndMembership"])({
                                        supabase,
                                        user: session.user,
                                        formData
                                    });
                                    setSuccess("Account created! Redirecting to your dashboard…");
                                    router.push("/dashboard");
                                } catch (err) {
                                    setError(err?.message ?? "Registration failed");
                                } finally{
                                    setLoading(false);
                                }
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "Full Name",
                                    required: true,
                                    value: fullName,
                                    onChange: (e)=>setFullName(e.target.value),
                                    className: "w-full rounded-lg bg-[#0F1424] border border-white/10 px-4 py-3 outline-none focus:border-[#D4AF37]/70"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "Address (Line 1, City, Province)",
                                    required: true,
                                    value: address,
                                    onChange: (e)=>setAddress(e.target.value),
                                    className: "w-full rounded-lg bg-[#0F1424] border border-white/10 px-4 py-3 outline-none focus:border-[#D4AF37]/70"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    placeholder: "Email",
                                    required: true,
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value),
                                    className: "w-full rounded-lg bg-[#0F1424] border border-white/10 px-4 py-3 outline-none focus:border-[#D4AF37]/70"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                    lineNumber: 256,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "Contact Number",
                                    required: true,
                                    pattern: "[0-9]{10}",
                                    title: "10-digit phone number",
                                    value: contactNumber,
                                    onChange: (e)=>setContactNumber(e.target.value),
                                    className: "w-full rounded-lg bg-[#0F1424] border border-white/10 px-4 py-3 outline-none focus:border-[#D4AF37]/70"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                    lineNumber: 264,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "Emergency Contact Number",
                                    required: true,
                                    pattern: "[0-9]{10}",
                                    title: "10-digit phone number",
                                    value: emergencyContact,
                                    onChange: (e)=>setEmergencyContact(e.target.value),
                                    className: "w-full rounded-lg bg-[#0F1424] border border-white/10 px-4 py-3 outline-none focus:border-[#D4AF37]/70"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "password",
                                                    placeholder: "Password",
                                                    required: true,
                                                    onChange: (e)=>setPassword(e.target.value),
                                                    className: "w-full rounded-lg bg-[#0F1424] border border-white/10 px-4 py-3 outline-none focus:border-[#D4AF37]/70"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 17
                                                }, this),
                                                strength && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `text-xs mt-1 ${strength === "Strong" ? "text-green-400" : strength === "Medium" ? "text-yellow-400" : "text-red-400"}`,
                                                    children: [
                                                        "Strength: ",
                                                        strength
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                            lineNumber: 285,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            placeholder: "Confirm Password",
                                            required: true,
                                            value: confirmPassword,
                                            onChange: (e)=>setConfirmPassword(e.target.value),
                                            className: "w-full rounded-lg bg-[#0F1424] border border-white/10 px-4 py-3 outline-none focus:border-[#D4AF37]/70"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                            lineNumber: 307,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block mb-2 text-sm text-gray-300",
                                            children: "Select up to 5 Fitness Goals"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                            lineNumber: 319,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-36 overflow-y-auto rounded-lg border border-white/10 bg-[#0F1424] p-3 grid grid-cols-2 gap-2",
                                            children: fitnessGoals.map((goal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>toggleGoal(goal),
                                                    className: `text-sm rounded-full px-3 py-1 border transition ${selectedGoals.includes(goal) ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "border-white/20 text-gray-300 hover:border-[#D4AF37]/50"}`,
                                                    children: goal
                                                }, goal, false, {
                                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                                    lineNumber: 324,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                            lineNumber: 322,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block mb-3 text-sm text-gray-300",
                                            children: "Choose Your Membership Tier"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                            lineNumber: 342,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                            children: tiers.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setTier(t.name),
                                                    className: `flex flex-col justify-between text-center rounded-xl p-6 border transition-all hover:scale-[1.03] ${tier === t.name ? "border-[#D4AF37] bg-gradient-to-r from-yellow-700/20 to-yellow-400/10 shadow-[0_0_25px_rgba(212,175,55,0.4)]" : "border-white/10 hover:border-[#D4AF37]/50"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-xl font-semibold text-[#D4AF37] mb-2",
                                                            children: t.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                                            lineNumber: 357,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-lg font-bold text-gray-100",
                                                            children: t.price
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                                            lineNumber: 360,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 mt-2",
                                                            children: t.tagline
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, t.name, true, {
                                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                            lineNumber: 345,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-red-400",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                    lineNumber: 367,
                                    columnNumber: 23
                                }, this),
                                success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-emerald-400",
                                    children: success
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                    lineNumber: 368,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$CPS714$2d$Section3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading,
                                    className: "w-full mt-6 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold px-4 py-3 shadow-xl hover:shadow-yellow-500/40 transition-all disabled:opacity-60",
                                    children: loading ? "Creating account..." : "Create Account"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                                    lineNumber: 371,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/CPS714-Section3/app/register/page.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5c68227b._.js.map