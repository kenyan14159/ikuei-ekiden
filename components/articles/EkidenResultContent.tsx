"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// 男子選手データ
const maleRunners = [
    { section: 1, name: "菅野元太", grade: "3年", time: "0:29:07", result: "区間6位" },
    { section: 2, name: "簡　子傑", grade: "3年", time: "0:08:04", result: "区間4位" },
    { section: 3, name: "鈴木大翔", grade: "3年", time: "0:23:35", result: "区間3位" },
    { section: 4, name: "近江亮", grade: "3年", time: "0:23:02", result: "区間賞", isAward: true },
    { section: 5, name: "佐々木蓮斗", grade: "3年", time: "0:08:42", result: "区間6位" },
    { section: 6, name: "佐藤賢仁", grade: "3年", time: "0:14:26", result: "区間3位" },
    { section: 7, name: "若林司", grade: "3年", time: "0:14:03", result: "区間賞", isAward: true },
];

// 女子選手データ
const femaleRunners = [
    { section: 1, name: "長森結愛", grade: "1年", time: "0:19:09", result: "区間3位" },
    { section: 2, name: "黒川志帆", grade: "1年", time: "0:13:33", result: "区間18位" },
    { section: 3, name: "ミリアムジェリ", grade: "2年", time: "0:09:16", result: "区間2位" },
    { section: 4, name: "渡辺光桃", grade: "3年", time: "0:09:24", result: "区間5位" },
    { section: 5, name: "橘のん", grade: "2年", time: "0:16:16", result: "区間9位" },
];

const images = [
    "/images/topics/ikuei-miyakoji1.jpg",
    "/images/topics/ikuei-miyakoji2.jpg",
    "/images/topics/ikuei-miyakoji3.jpg",
];

interface RunnerRowProps {
    section: number;
    name: string;
    grade: string;
    time: string;
    result: string;
    isAward?: boolean;
    index: number;
}

function RunnerRow({ section, name, grade, time, result, isAward, index }: RunnerRowProps) {
    return (
        <motion.tr
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
        >
            <td className="py-4 px-4 text-center font-medium text-gray-600">{section}区</td>
            <td className="py-4 px-4 font-semibold text-gray-900">{name}</td>
            <td className="py-4 px-4 text-gray-500 text-sm">{grade}</td>
            <td className="py-4 px-4 text-center font-mono text-gray-700">{time}</td>
            <td className="py-4 px-4 text-right">
                {isAward ? (
                    <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 font-semibold text-sm border border-amber-200">
                        {result}
                    </span>
                ) : (
                    <span className="text-gray-700">{result}</span>
                )}
            </td>
        </motion.tr>
    );
}

export default function EkidenResultContent() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="space-y-16">
            {/* イントロダクション */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl mx-auto"
            >
                <p className="text-lg text-gray-700 leading-relaxed tracking-wide">
                    12月21日（日）、第76回全国高校駅伝が開催され、
                    陸上競技部（長距離）が出場いたしました。
                </p>
            </motion.div>

            {/* 画像ギャラリー */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {images.map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedImage(src)}
                    >
                        <Image
                            src={src}
                            alt={`第76回全国高校駅伝 写真${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </motion.div>
                ))}
            </motion.div>

            {/* 男子結果 */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white"
            >
                <div className="border-l-4 border-blue-600 pl-6 mb-8">
                    <p className="text-sm text-blue-600 font-medium tracking-widest uppercase mb-2">Men&apos;s Result</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">男子　準優勝</h2>
                </div>

                <div className="mb-8 pl-6">
                    <div className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight mb-3">
                        2:00:59
                    </div>
                    <div className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium tracking-wide">
                        高校最高記録 / 大会新記録
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-900">
                                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">区間</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">選手名</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">学年</th>
                                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">タイム</th>
                                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">成績</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maleRunners.map((runner, index) => (
                                <RunnerRow key={runner.section} {...runner} index={index} />
                            ))}
                        </tbody>
                    </table>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-gray-600 leading-relaxed pl-6 border-l border-gray-200"
                >
                    高校生では不可能と言われていた2時間0分台を達成できたことは、
                    これからの新しいチームの未来を切り拓く大きな一歩となりました。
                </motion.p>
            </motion.section>

            {/* 女子結果 */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white"
            >
                <div className="border-l-4 border-rose-500 pl-6 mb-8">
                    <p className="text-sm text-rose-500 font-medium tracking-widest uppercase mb-2">Women&apos;s Result</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">女子　第4位</h2>
                </div>

                <div className="mb-8 pl-6">
                    <div className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
                        1:07:38
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-900">
                                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">区間</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">選手名</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">学年</th>
                                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">タイム</th>
                                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">成績</th>
                            </tr>
                        </thead>
                        <tbody>
                            {femaleRunners.map((runner, index) => (
                                <RunnerRow key={runner.section} {...runner} index={index} />
                            ))}
                        </tbody>
                    </table>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="mt-8 text-gray-600 leading-relaxed pl-6 border-l border-gray-200"
                >
                    5人中4人が1・2年生というチームで挑み、来年につながる走りを見せてくれました。
                    また新しい歴史を築いていけるよう、精進してまいります。
                </motion.p>
            </motion.section>

            {/* 謝辞 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="border-t border-b border-gray-200 py-10 text-center"
            >
                <p className="text-gray-600 leading-loose max-w-2xl mx-auto">
                    日頃より陸上競技部に温かいご支援とご指導を賜り、誠にありがとうございます。
                    <br />
                    この場をお借りして、改めて御礼申し上げます。
                    <br />
                    これからも、地元の皆さまに応援されるチームを目指してまいります。
                </p>
            </motion.div>

            {/* ハッシュタグ */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="flex flex-wrap justify-center gap-3"
            >
                {[
                    "仙台育英",
                    "陸上競技部",
                    "高校駅伝",
                    "第76回全国高校駅伝",
                    "大会新記録",
                    "高校最高記録",
                ].map((tag) => (
                    <span
                        key={tag}
                        className="text-gray-400 text-sm"
                    >
                        #{tag}
                    </span>
                ))}
            </motion.div>

            {/* 画像モーダル */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative max-w-5xl w-full aspect-[4/3]"
                    >
                        <Image
                            src={selectedImage}
                            alt="拡大画像"
                            fill
                            className="object-contain"
                        />
                        <button
                            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            ×
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
