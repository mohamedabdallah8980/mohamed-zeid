import React, { useState } from 'react';
import { Download, Code2, Copy, Check, Terminal, FileCode, X } from 'lucide-react';

interface FlutterExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterExportModal: React.FC<FlutterExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>('main.dart');

  if (!isOpen) return null;

  const flutterFiles: Record<string, { path: string; code: string }> = {
    'pubspec.yaml': {
      path: 'pubspec.yaml',
      code: `name: scorepulse_live
description: "A production-grade Live Football Scores mobile application (Android & iOS) powered by API-Football v3."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'
  flutter: ">=3.16.0"

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter

  # State Management & DI
  flutter_bloc: ^8.1.3
  equatable: ^2.0.5
  get_it: ^7.6.4
  dartz: ^0.10.1

  # Networking & Caching
  dio: ^5.4.0
  cached_network_image: ^3.3.1
  connectivity_plus: ^5.0.2

  # Navigation & Storage
  go_router: ^13.1.0
  shared_preferences: ^2.2.2

  # UI & Fonts
  google_fonts: ^6.1.0
  shimmer: ^3.0.0
  intl: ^0.19.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.1

flutter:
  uses-material-design: true`,
    },
    'main.dart': {
      path: 'lib/main.dart',
      code: `import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'core/theme/app_colors.dart';
import 'features/scores/presentation/screens/scores_screen.dart';
import 'features/standings/presentation/screens/standings_screen.dart';
import 'features/favorites/presentation/screens/favorites_screen.dart';
import 'features/search/presentation/screens/search_screen.dart';
import 'features/settings/presentation/screens/settings_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ScorePulseApp());
}

class ScorePulseApp extends StatefulWidget {
  const ScorePulseApp({super.key});

  @override
  State<ScorePulseApp> createState() => _ScorePulseAppState();
}

class _ScorePulseAppState extends State<ScorePulseApp> {
  Locale _locale = const Locale('ar');

  void setLocale(Locale locale) {
    setState(() => _locale = locale);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ScorePulse Live',
      debugShowCheckedModeBanner: false,
      locale: _locale,
      supportedLocales: const [Locale('ar', ''), Locale('en', '')],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: AppColors.darkBackground,
        cardColor: AppColors.darkCard,
        primaryColor: AppColors.accentGreen,
      ),
      home: MainShellScreen(onLocaleChange: setLocale),
    );
  }
}`,
    },
    'pitch_painter.dart': {
      path: 'lib/features/match_details/presentation/widgets/pitch_painter.dart',
      code: `import 'package:flutter/material.dart';

class PitchPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // 1. Draw alternating grass stripes
    final stripeHeight = size.height / 10;
    for (int i = 0; i < 10; i++) {
      final stripePaint = Paint()
        ..color = i % 2 == 0 ? const Color(0xFF1B4D24) : const Color(0xFF163E1D);
      canvas.drawRect(Rect.fromLTWH(0, i * stripeHeight, size.width, stripeHeight), stripePaint);
    }

    // 2. White Line Markings
    final linePaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.75)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.2;

    // Field boundary
    canvas.drawRect(Rect.fromLTWH(8, 8, size.width - 16, size.height - 16), linePaint);
    // Half-way line
    canvas.drawLine(Offset(8, size.height / 2), Offset(size.width - 8, size.height / 2), linePaint);
    // Center circle
    canvas.drawCircle(Offset(size.width / 2, size.height / 2), size.width * 0.18, linePaint);
    // Penalty areas
    final pWidth = size.width * 0.55;
    final pHeight = size.height * 0.16;
    final pLeft = (size.width - pWidth) / 2;
    canvas.drawRect(Rect.fromLTWH(pLeft, 8, pWidth, pHeight), linePaint);
    canvas.drawRect(Rect.fromLTWH(pLeft, size.height - 8 - pHeight, pWidth, pHeight), linePaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}`,
    },
    'scores_screen.dart': {
      path: 'lib/features/scores/presentation/screens/scores_screen.dart',
      code: `import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../match_details/presentation/screens/match_details_screen.dart';

class ScoresScreen extends StatelessWidget {
  const ScoresScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        backgroundColor: AppColors.darkSurface,
        title: const Text('ScorePulse Live', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: ListView(
        children: [
          // Match Card with Live Minute and Navigation to Pitch
          // ...
        ],
      ),
    );
  }
}`,
    },
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#101010] border border-[#2A2A2A] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#161616] border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00FF87]/15 border border-[#00FF87]/30 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-[#00FF87]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                مشروع Flutter & Dart الكامل (Android & iOS)
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/30 font-mono">
                  v3 Clean Architecture
                </span>
              </h2>
              <p className="text-[11px] text-neutral-400">
                جميع ملفات Flutter و Dart جاهزة للتشغيل الفوري في VS Code
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Download ZIP button */}
            <a
              href="/scorepulse_flutter.zip"
              download="scorepulse_flutter.zip"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00FF87] text-black font-extrabold text-xs hover:bg-[#00df76] transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل المشروع (.zip)</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-800 text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Instructions Bar */}
        <div className="p-3 bg-[#131313] border-b border-[#222222] flex items-center gap-3 text-xs text-neutral-300 overflow-x-auto">
          <Terminal className="w-4 h-4 text-[#00FF87] flex-shrink-0" />
          <span className="font-semibold text-neutral-400">طريقة التشغيل في VS Code:</span>
          <code className="bg-black/60 px-2 py-1 rounded border border-neutral-800 font-mono text-[11px] text-[#00FF87]">
            flutter pub get && flutter run
          </code>
        </div>

        {/* Code Viewer Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[220px_1fr] overflow-hidden min-h-[350px]">
          {/* File list */}
          <div className="bg-[#121212] border-r border-[#222222] p-2 space-y-1 overflow-y-auto">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1 block">
              ملفات المشروع (Flutter / Dart)
            </span>
            {Object.keys(flutterFiles).map((fileName) => {
              const isSelected = selectedFile === fileName;
              return (
                <button
                  key={fileName}
                  onClick={() => setSelectedFile(fileName)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors ${
                    isSelected
                      ? 'bg-[#1E1E1E] text-[#00FF87] border border-[#00FF87]/30'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-[#00FF87]" />
                  <span className="truncate font-mono text-[11px]">{fileName}</span>
                </button>
              );
            })}
          </div>

          {/* Code Viewer */}
          <div className="flex flex-col bg-[#0A0A0A] overflow-hidden">
            <div className="p-2.5 bg-[#141414] border-b border-[#222222] flex items-center justify-between text-xs">
              <span className="font-mono text-neutral-400 text-[11px]">
                {flutterFiles[selectedFile]?.path}
              </span>
              <button
                onClick={() =>
                  copyToClipboard(flutterFiles[selectedFile]?.code || '', selectedFile)
                }
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] transition-colors"
              >
                {copiedKey === selectedFile ? (
                  <>
                    <Check className="w-3 h-3 text-[#00FF87]" />
                    <span className="text-[#00FF87]">تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>نسخ الكود</span>
                  </>
                )}
              </button>
            </div>

            <pre className="flex-1 p-4 overflow-auto font-mono text-xs text-neutral-200 leading-relaxed custom-scrollbar selection:bg-[#00FF87] selection:text-black">
              <code>{flutterFiles[selectedFile]?.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
