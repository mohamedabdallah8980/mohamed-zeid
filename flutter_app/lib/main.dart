import 'package:flutter/material.dart';
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
  Locale _locale = const Locale('ar'); // Default Arabic

  void setLocale(Locale locale) {
    setState(() {
      _locale = locale;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ScorePulse Live',
      debugShowCheckedModeBanner: false,
      locale: _locale,
      supportedLocales: const [
        Locale('ar', ''),
        Locale('en', ''),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: AppColors.darkBackground,
        cardColor: AppColors.darkCard,
        primaryColor: AppColors.accentGreen,
        colorScheme: const ColorScheme.dark(
          primary: AppColors.accentGreen,
          surface: AppColors.darkSurface,
        ),
      ),
      home: MainShellScreen(onLocaleChange: setLocale),
    );
  }
}

class MainShellScreen extends StatefulWidget {
  final Function(Locale) onLocaleChange;
  const MainShellScreen({super.key, required this.onLocaleChange});

  @override
  State<MainShellScreen> createState() => _MainShellScreenState();
}

class _MainShellScreenState extends State<MainShellScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final screens = [
      const ScoresScreen(),
      const FavoritesScreen(),
      const StandingsScreen(),
      const SearchScreen(),
      SettingsScreen(onLocaleChange: widget.onLocaleChange),
    ];

    final isArabic = Localizations.localeOf(context).languageCode == 'ar';

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        backgroundColor: AppColors.darkSurface,
        indicatorColor: AppColors.accentGreen.withValues(alpha: 0.2),
        onDestinationSelected: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        destinations: [
          NavigationDestination(
            icon: const Icon(Icons.sports_soccer_outlined),
            selectedIcon: const Icon(Icons.sports_soccer_rounded, color: AppColors.accentGreen),
            label: isArabic ? 'المباريات' : 'Scores',
          ),
          NavigationDestination(
            icon: const Icon(Icons.star_outline_rounded),
            selectedIcon: const Icon(Icons.star_rounded, color: AppColors.accentGreen),
            label: isArabic ? 'المفضلة' : 'Favorites',
          ),
          NavigationDestination(
            icon: const Icon(Icons.format_list_numbered_rounded),
            selectedIcon: const Icon(Icons.format_list_numbered_rounded, color: AppColors.accentGreen),
            label: isArabic ? 'الترتيب' : 'Standings',
          ),
          NavigationDestination(
            icon: const Icon(Icons.search_rounded),
            selectedIcon: const Icon(Icons.search, color: AppColors.accentGreen),
            label: isArabic ? 'بحث' : 'Search',
          ),
          NavigationDestination(
            icon: const Icon(Icons.settings_outlined),
            selectedIcon: const Icon(Icons.settings_rounded, color: AppColors.accentGreen),
            label: isArabic ? 'الإعدادات' : 'Settings',
          ),
        ],
      ),
    );
  }
}
