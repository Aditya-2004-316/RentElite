import React, { useState, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { useSettings } from "../context/SettingsContext";
import robotAssistant from "../assets/robot-assistant.png";
import robot from "../assets/robot.png";

const ChatBot = () => {
    const { translate, language } = useSettings();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [hasGreeted, setHasGreeted] = useState(false);

    // Enhanced patterns with more natural responses
    const patterns = [
        {
            matches: [
                "hello",
                "hi",
                "hey",
                "greetings",
                "नमस्ते",
                "हाय",
                "सुप्रभात",
                "शुभ संध्या",
            ],
            response: {
                english:
                    "Hi there! 👋 I'm your Rent Elite virtual assistant. How can I make your car rental experience better today?",
                hindi: "नमस्ते! 👋 मैं आपका रेंट एलीट वर्चुअल सहायक हूं। आज मैं आपके कार रेंटल अनुभव को कैसे बेहतर बना सकता हूं?",
            },
        },
        {
            matches: ["bye", "goodbye", "see you", "अलविदा", "फिर मिलेंगे"],
            response: {
                english:
                    "Thanks for chatting! If you need anything else, I'll be right here. Have a great day! 😊",
                hindi: "चैट करने के लिए धन्यवाद! यदि आपको कुछ और चाहिए, तो मैं यहीं हूं। आपका दिन शुभ हो! 😊",
            },
        },
        {
            matches: ["thank", "thanks", "धन्यवाद", "शुक्रिया"],
            response: {
                english:
                    "You're welcome! 😊 Is there anything else you'd like to know about our services?",
                hindi: "आपका स्वागत है! 😊 क्या आप हमारी सेवाओं के बारे में कुछ और जानना चाहेंगे?",
            },
        },
        {
            matches: [
                "how to book",
                "book car",
                "booking process",
                "rent car",
                "how do i book",
                "booking steps",
                "make reservation",
                "कार बुक",
                "कैसे बुक करें",
                "बुकिंग प्रक्रिया",
            ],
            response: {
                english:
                    "To book a car:\n1. Browse our fleet and select your desired car\n2. Click 'Book Now'\n3. Choose your dates\n4. Fill in your details\n5. Confirm payment\nNeed more help? Our support team is available 24/7.",
                hindi: "कार बुक करने के लिए:\n1. हमारी फ्लीट देखें और अपनी पसंदीदा कार चुनें\n2. 'अभी बुक करें' पर क्लिक करें\n3. तारीखें चुनें\n4. अपनी जानकारी भरें\n5. भुगतान की पुष्टि करें\nऔर मदद चाहिए? हमारी सहायता टीम 24/7 उपलब्ध है।",
            },
        },
        {
            matches: [
                "cancel booking",
                "cancellation",
                "cancel reservation",
                "how to cancel",
                "बुकिंग रद्द",
                "कैंसिल",
            ],
            response: {
                english:
                    "To cancel your booking:\n1. Go to 'My Bookings'\n2. Find your reservation\n3. Click 'Cancel Booking'\n\nNote: Free cancellation is available up to 48 hours before pickup.",
                hindi: "बुकिंग रद्द करने के लिए:\n1. 'मेरी बुकिंग' पर जाएं\n2. अपनी बुकिंग ढूंढें\n3. 'बुकिंग रद्द करें' पर क्लिक करें\n\nनोट: पिकअप से 48 घंटे पहले तक मुफ्त कैंसिलेशन उपलब्ध है।",
            },
        },
        {
            matches: [
                "payment method",
                "payment options",
                "how to pay",
                "accepted payment",
                "भुगतान विधि",
                "पेमेंट",
            ],
            response: {
                english:
                    "We accept:\n- Credit/Debit Cards\n- PayPal\n- Net Banking\n- UPI (for Indian customers)\n\nAll payments are secured with end-to-end encryption.",
                hindi: "हम स्वीकार करते हैं:\n- क्रेडिट/डेबिट कार्ड\n- पेपाल\n- नेट बैंकिंग\n- यूपीआई\n\nसभी भुगतान एंड-टू-एंड एन्क्रिप्शन के साथ सुरक्षित हैं।",
            },
        },
        {
            matches: [
                "documents required",
                "what documents",
                "documents needed",
                "required documents",
                "आवश्यक दस्तावेज",
                "जरूरी कागजात",
            ],
            response: {
                english:
                    "Required documents:\n- Valid Driver's License\n- Government ID Proof\n- Credit Card\n- Insurance Information\n\nInternational customers also need:\n- Passport\n- International Driving Permit",
                hindi: "आवश्यक दस्तावेज:\n- वैध ड्राइविंग लाइसेंस\n- सरकारी पहचान प्रमाण\n- क्रेडिट कार्ड\n- बीमा जानकारी\n\nविदेशी ग्राहकों को यह भी चाहिए:\n- पासपोर्ट\n- अंतर्राष्ट्रीय ड्राइविंग परमिट",
            },
        },
        {
            matches: [
                "contact support",
                "help",
                "customer service",
                "support number",
                "सहायता",
                "संपर्क",
                "कस्टमर सर्विस",
            ],
            response: {
                english:
                    "Contact our support team:\nPhone: +1-800-RENT-ELITE\nEmail: support@rentelite.com\nLive Chat: Available 24/7\n\nVisit our Contact Us page for more options.",
                hindi: "हमारी सहायता टीम से संपर्क करें:\nफोन: +1-800-RENT-ELITE\nईमेल: support@rentelite.com\nलाइव चैट: 24/7 उपलब्ध\n\nअधिक विकल्पों के लिए हमारा संपर्क पेज देखें।",
            },
        },
        {
            matches: [
                "price",
                "cost",
                "rate",
                "charges",
                "कीमत",
                "दर",
                "शुल्क",
            ],
            response: {
                english:
                    "Our rental rates vary based on the car model and duration. Would you like me to:\n1. Show you our current offers?\n2. Explain our pricing structure?\n3. Help you find cars within your budget?\n\nJust let me know what works best for you! 🚗",
                hindi: "हमारी किराये की दरें कार मॉडल और अवधि के आधार पर अलग-अलग होती हैं। क्या आप चाहेंगे कि मैं:\n1. आपको हमारे वर्तमान ऑफर दिखाऊं?\n2. हमारी मूल्य संरचना समझाऊं?\n3. आपके बजट के अनुसार कारें खोजने में मदद करूं?\n\nबस मुझे बताएं कि आपके लिए क्या सही रहेगा! 🚗",
            },
        },
        {
            matches: [
                "how are you",
                "how're you",
                "how you doing",
                "what's up",
                "whats up",
                "how do you do",
                "how is it going",
                "कैसे हो",
                "कैसा चल रहा है",
                "क्या हाल है",
                "सब ठीक",
            ],
            response: {
                english:
                    "I'm doing great, thanks for asking! 😊 I'm here and ready to help you find the perfect car rental. How can I assist you today?",
                hindi: "मैं बहुत अच्छा हूं, पूछने के लिए धन्यवाद! 😊 मैं आपको सही कार रेंटल ढूंढने में मदद करने के लिए तैयार हूं। मैं आपकी कैसे सहायता कर सकता हूं?",
            },
        },
        {
            matches: [
                "who are you",
                "what are you",
                "what can you do",
                "your name",
                "tell me about yourself",
                "आप कौन हैं",
                "तुम क्या हो",
                "तुम क्या कर सकते हो",
                "अपने बारे में बताओ",
            ],
            response: {
                english:
                    "I'm the Rent Elite virtual assistant! 🤖 I can help you with:\n• Finding the perfect car\n• Booking process\n• Managing reservations\n• Answering questions about our services\n• And much more!\n\nWhat would you like help with?",
                hindi: "मैं रेंट एलीट का वर्चुअल सहायक हूं! 🤖 मैं आपकी इन चीज़ों में मदद कर सकता हूं:\n• सही कार खोजने में\n• बुकिंग प्रक्रिया में\n• आरक्षण प्रबंधन में\n• हमारी सेवाओं के बारे में जानकारी देने में\n• और बहुत कुछ!\n\nआपको किस विषय में मदद चाहिए?",
            },
        },
        {
            matches: [
                "good morning",
                "morning",
                "good afternoon",
                "good evening",
                "शुभ प्रभात",
                "सुप्रभात",
                "शुभ दोपहर",
                "शुभ संध्या",
            ],
            response: {
                english:
                    "Hello! 👋 It's great to see you! I hope you're having a wonderful day. How may I assist you with your car rental needs?",
                hindi: "नमस्ते! 👋 आपसे मिलकर अच्छा लगा! आशा है आपका दिन बहुत अच्छा जा रहा है। मैं आपकी कार रेंटल संबंधित कैसे मदद कर सकता हूं?",
            },
        },
        {
            matches: [
                "are you human",
                "are you real",
                "are you a bot",
                "are you ai",
                "क्या तुम इंसान हो",
                "क्या तुम असली हो",
                "क्या तुम बॉट हो",
                "क्या तुम एआई हो",
            ],
            response: {
                english:
                    "I'm an AI chatbot designed to help you with Rent Elite's services! 🤖 While I'm not human, I'm here to provide quick and helpful assistance with your car rental needs. What can I help you with today?",
                hindi: "मैं एक एआई चैटबॉट हूं जो रेंट एलीट की सेवाओं में आपकी मदद करने के लिए बनाया गया है! 🤖 हालांकि मैं मानव नहीं हूं, मैं आपकी कार रेंटल जरूरतों में त्वरित और सहायक मदद प्रदान करने के लिए यहां हूं। आज मैं आपकी क्या मदद कर सकता हूं?",
            },
        },
        {
            matches: [
                "how's the weather",
                "what's the weather",
                "मौसम कैसा है",
                "weather",
            ],
            response: {
                english:
                    "While I can't tell you about the weather, I can help you find the perfect car for any weather condition! 😊 Would you like to see our all-weather vehicles or perhaps our convertibles for sunny days?",
                hindi: "हालांकि मैं मौसम के बारे में नहीं बता सकता, लेकिन मैं आपको हर मौसम के लिए एकदम सही कार खोजने में मदद कर सकता हूं! 😊 क्या आप हमारी ऑल-वेदर व्हीकल्स देखना चाहेंगे या फिर धूप के दिनों के लिए कन्वर्टिबल कारें?",
            },
        },
    ];

    // Enhanced findBestMatch function with FAQ suggestion
    const findBestMatch = (input) => {
        const normalizedInput = input.toLowerCase();

        // Check for direct matches first
        for (const pattern of patterns) {
            if (
                pattern.matches.some((match) =>
                    normalizedInput.includes(match.toLowerCase())
                )
            ) {
                return pattern.response[language] || pattern.response.english;
            }
        }

        // If no direct match, provide a helpful response with FAQ suggestion
        const noMatchResponses = {
            english: [
                "I'm not quite sure about that one. 🤔 Let me help you find the right information:",
                "\n1. Check our FAQ page for detailed answers: [FAQ Link]",
                "\n2. Contact our support team 24/7",
                "\n3. Try rephrasing your question",
                "\nOr, you can ask me about:",
                "• Booking process",
                "• Available cars",
                "• Pricing and payments",
                "• Cancellation policy",
                "• Required documents",
                "\nWhat would you like to know more about? 😊",
            ].join("\n"),
            hindi: [
                "मुझे इस बारे में पूरी जानकारी नहीं है। 🤔 चलिए सही जानकारी खोजने में मैं आपकी मदद करता हूं:",
                "\n1. विस्तृत जवाबों के लिए हमारा FAQ पेज देखें: [FAQ लिंक]",
                "\n2. हमारी सहायता टीम से 24/7 संपर्क करें",
                "\n3. अपना प्रश्न दूसरे तरीके से पूछने का प्रयास करें",
                "\nया, आप मुझसे इन विषयों के बारे में पूछ सकते हैं:",
                "• बुकिंग प्रक्रिया",
                "• उपलब्ध कारें",
                "• कीमतें और भुगतान",
                "• रद्दीकरण नीति",
                "• आवश्यक दस्तावेज",
                "\nआप किस बारे में और जानना चाहेंगे? 😊",
            ].join("\n"),
        };

        return noMatchResponses[language] || noMatchResponses.english;
    };

    // Enhanced message handling with typing indicator
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message
        setMessages((prev) => [
            ...prev,
            { type: "user", content: inputMessage },
        ]);

        // Show typing indicator
        setIsTyping(true);

        // Get bot response
        const botResponse = findBestMatch(inputMessage);

        // Simulate natural typing delay (varying based on response length)
        const typingDelay = Math.min(1000 + botResponse.length * 10, 3000);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { type: "bot", content: botResponse },
            ]);
            setIsTyping(false);
        }, typingDelay);

        setInputMessage("");
    };

    useEffect(() => {
        // Only add the welcome message when the chat is opened and hasn't greeted yet
        if (isOpen && !hasGreeted) {
            setTimeout(() => {
                setMessages([
                    {
                        type: "bot",
                        content:
                            language === "hindi"
                                ? "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?"
                                : "Hello! How can I assist you today?",
                    },
                ]);
                setHasGreeted(true);
            }, 500);
        }
    }, [isOpen, hasGreeted, language]);

    // Helper function to format message content with proper line breaks
    const formatMessage = (content) => {
        // Replace \n with proper line breaks for rendering
        return content.split("\n").map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i < content.split("\n").length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 ${
                    isOpen ? "scale-0" : "scale-100"
                }`}
            >
                <img
                    src={robotAssistant}
                    alt="Robot Assistant Icon"
                    className="w-8 h-8"
                />
                {/* <FaRobot className="text-2xl" /> */}
            </button>

            {/* Chat Window */}
            <div
                className={`absolute bottom-0 right-0 w-96 bg-white rounded-lg shadow-xl transition-all duration-300 transform ${
                    isOpen ? "scale-100" : "scale-0"
                }`}
            >
                {/* Header */}
                <div className="bg-emerald-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src={robot} alt="Robot Icon" className="w-6 h-6" />
                        <h3 className="font-semibold">Rent Elite Assistant</h3>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                message.type === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-lg ${
                                    message.type === "user"
                                        ? "bg-emerald-600 text-white rounded-br-none"
                                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                                }`}
                            >
                                {formatMessage(message.content)}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div
                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.2s" }}
                                    ></div>
                                    <div
                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.4s" }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder={
                                language === "hindi"
                                    ? "अपना संदेश यहां टाइप करें..."
                                    : "Type your message..."
                            }
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                        <button
                            type="submit"
                            className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;
