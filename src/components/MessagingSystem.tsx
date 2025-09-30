import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Send, Phone, Video, MoreHorizontal, Paperclip, Smile, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'location' | 'booking';
  isRead: boolean;
}

interface Conversation {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  partnerType: 'guide' | 'tourist' | 'hotelier';
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

export const MessagingSystem = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      partnerId: "guide1",
      partnerName: "Maria Rodriguez",
      partnerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100",
      partnerType: "guide",
      lastMessage: "Thank you for booking! I'll send you the meeting point details.",
      lastMessageTime: new Date(Date.now() - 10 * 60 * 1000),
      unreadCount: 2,
      isOnline: true
    },
    {
      id: "2",
      partnerId: "guide2", 
      partnerName: "Ahmed Hassan",
      partnerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      partnerType: "guide",
      lastMessage: "The pyramids tour starts at 8 AM. Should I pick you up from the hotel?",
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 0,
      isOnline: false
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "guide1",
      senderName: "Maria Rodriguez",
      senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100",
      content: "Hi! Thanks for your interest in the Barcelona Architecture tour. I'd be happy to customize it for you!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: "text",
      isRead: true
    },
    {
      id: "2",
      senderId: user?.id || "current-user",
      senderName: "You",
      senderAvatar: "",
      content: "That sounds perfect! I'm particularly interested in Gaudí's work. Can we spend extra time at Sagrada Família?",
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      type: "text",
      isRead: true
    },
    {
      id: "3",
      senderId: "guide1",
      senderName: "Maria Rodriguez", 
      senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100",
      content: "Absolutely! I can arrange a special extended visit with skip-the-line tickets. The total would be $65 for 4 hours.",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      type: "text",
      isRead: true
    },
    {
      id: "4",
      senderId: "guide1",
      senderName: "Maria Rodriguez",
      senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100", 
      content: "Thank you for booking! I'll send you the meeting point details.",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: "text",
      isRead: false
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user?.id || "current-user",
      senderName: "You",
      senderAvatar: "",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      isRead: false
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Update conversation last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, lastMessage: newMessage, lastMessageTime: new Date() }
        : conv
    ));
  };

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="h-[600px] border rounded-lg overflow-hidden bg-background">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-1/3 border-r bg-muted/30">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Messages</h3>
          </div>
          <div className="overflow-y-auto h-full">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.partnerAvatar} />
                      <AvatarFallback>{conversation.partnerName[0]}</AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate">{conversation.partnerName}</h4>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs">
                        {conversation.partnerType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {currentConversation && (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-background">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={currentConversation.partnerAvatar} />
                      <AvatarFallback>{currentConversation.partnerName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{currentConversation.partnerName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {currentConversation.isOnline ? "Online" : "Last seen 2h ago"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === (user?.id || "current-user") ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className={`flex gap-2 max-w-[70%] ${
                      message.senderId === (user?.id || "current-user") ? "flex-row-reverse" : "flex-row"
                    }`}>
                      {message.senderId !== (user?.id || "current-user") && (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={message.senderAvatar} />
                          <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`rounded-lg p-3 ${
                        message.senderId === (user?.id || "current-user")
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}>
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === (user?.id || "current-user")
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MapPin className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};