class AppConfig {
  AppConfig._();

  static const String apiBaseUrl = 'https://v3.football.api-sports.io';
  static const String apiKeyHeader = 'x-apisports-key';
  
  /// Replace this with your API-Sports key or pass via --dart-define
  static const String apiKey = String.fromEnvironment(
    'API_FOOTBALL_KEY',
    defaultValue: 'YOUR_API_KEY_HERE',
  );

  static const Duration connectTimeout = Duration(seconds: 15);
  static const Duration receiveTimeout = Duration(seconds: 15);
  static const Duration liveRefreshInterval = Duration(seconds: 45);

  // Featured Leagues IDs
  static const int premierLeagueId = 39;
  static const int laLigaId = 140;
  static const int championsLeagueId = 2;
  static const int serieAId = 135;
  static const int bundesligaId = 78;
  static const int egyptianPremierLeagueId = 233;
}
