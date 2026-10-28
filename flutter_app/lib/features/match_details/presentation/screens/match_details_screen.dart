import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../widgets/pitch_painter.dart';

class MatchDetailsScreen extends StatefulWidget {
  final Map<String, dynamic> matchData;
  const MatchDetailsScreen({super.key, required this.matchData});

  @override
  State<MatchDetailsScreen> createState() => _MatchDetailsScreenState();
}

class _MatchDetailsScreenState extends State<MatchDetailsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final homeTeam = widget.matchData['homeTeam'] ?? 'Arsenal';
    final awayTeam = widget.matchData['awayTeam'] ?? 'Chelsea';
    final homeScore = widget.matchData['homeScore'] ?? 2;
    final awayScore = widget.matchData['awayScore'] ?? 1;
    final minute = widget.matchData['minute'] ?? 68;

    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        backgroundColor: AppColors.darkSurface,
        title: Text(widget.matchData['league'] ?? 'Premier League'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.star_outline_rounded, color: Colors.white),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          // Match Header Hero
          Container(
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: AppColors.darkCard,
              border: Border(bottom: BorderSide(color: AppColors.darkBorder)),
            ),
            child: Column(
              children: [
                // Live status
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                  decoration: BoxDecoration(
                    color: AppColors.accentGreen.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.accentGreen.withValues(alpha: 0.4)),
                  ),
                  child: Text(
                    "LIVE $minute'",
                    style: const TextStyle(
                      color: AppColors.accentGreen,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
                const SizedBox(height: 12),

                // Teams & Big Score
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Text(homeTeam, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                    Text(
                      '$homeScore - $awayScore',
                      style: const TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.w900,
                        color: AppColors.accentGreen,
                      ),
                    ),
                    Text(awayTeam, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                  ],
                ),
              ],
            ),
          ),

          // Tabs: Lineups / Stats / Timeline / H2H
          TabBar(
            controller: _tabController,
            indicatorColor: AppColors.accentGreen,
            labelColor: AppColors.accentGreen,
            unselectedLabelColor: AppColors.textMuted,
            tabs: const [
              Tab(text: 'التشكيلة'),
              Tab(text: 'الإحصائيات'),
              Tab(text: 'الأحداث'),
              Tab(text: 'المواجهات'),
            ],
          ),

          // Tab views
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                // 1. Lineups with PitchPainter
                SingleChildScrollView(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    children: [
                      Container(
                        height: 380,
                        width: double.infinity,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: const Color(0xFF1B4D24), width: 2),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(14),
                          child: Stack(
                            children: [
                              CustomPaint(
                                size: Size.infinite,
                                painter: PitchPainter(),
                              ),
                              // Players positioned on pitch
                              _buildPlayerNode(context, 0.5, 0.08, '22', 'رايا', Colors.red),
                              _buildPlayerNode(context, 0.2, 0.22, '4', 'وايت', Colors.red),
                              _buildPlayerNode(context, 0.4, 0.20, '2', 'صليبا', Colors.red),
                              _buildPlayerNode(context, 0.6, 0.20, '6', 'غابرييل', Colors.red),
                              _buildPlayerNode(context, 0.8, 0.22, '12', 'تيمبر', Colors.red),
                              _buildPlayerNode(context, 0.5, 0.35, '5', 'بارتي', Colors.red),
                              _buildPlayerNode(context, 0.3, 0.44, '41', 'رايس', Colors.red),
                              _buildPlayerNode(context, 0.7, 0.44, '8', 'أوديغارد', Colors.red),
                              _buildPlayerNode(context, 0.85, 0.60, '7', 'ساكا', Colors.red),
                              _buildPlayerNode(context, 0.5, 0.64, '29', 'هافيرتز', Colors.red),
                              _buildPlayerNode(context, 0.15, 0.60, '11', 'مارتينيلي', Colors.red),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                // 2. Stats
                const Center(child: Text('إحصائيات المباراة (الاستحواذ، التسديدات...)')),

                // 3. Timeline
                const Center(child: Text('الأهداف والبطاقات والتبديلات')),

                // 4. H2H
                const Center(child: Text('آخر 5 مواجهات بين الفريقين')),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPlayerNode(BuildContext context, double alignX, double alignY, String num, String name, Color color) {
    return Positioned(
      left: MediaQuery.of(context).size.width * alignX - 24,
      top: 380 * alignY,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          CircleAvatar(
            radius: 12,
            backgroundColor: color,
            child: Text(num, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white)),
          ),
          const SizedBox(height: 2),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
            decoration: BoxDecoration(color: Colors.black87, borderRadius: BorderRadius.circular(4)),
            child: Text(name, style: const TextStyle(fontSize: 9, color: Colors.white)),
          ),
        ],
      ),
    );
  }
}
