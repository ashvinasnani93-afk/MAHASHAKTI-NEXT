import { Injectable, Logger } from '@nestjs/common';

interface SafetyCheck {
  allowed: boolean;
  reason: string;
  blockedBy: string[];
}

@Injectable()
export class SafetyLayerService {
  private readonly logger = new Logger(SafetyLayerService.name);

  checkSafety(symbol: string, vix?: number): SafetyCheck {
    const blockedBy: string[] = [];

    // Check 1: Expiry Day
    if (this.isExpiryDay()) {
      blockedBy.push('EXPIRY_DAY');
    }

    // Check 2: Result Day (mock check - needs actual implementation)
    if (this.isResultDay(symbol)) {
      blockedBy.push('RESULT_DAY');
    }

    // Check 3: Weekend
    if (this.isWeekend()) {
      blockedBy.push('WEEKEND');
    }

    // Check 4: High VIX
    if (vix && vix > 25) {
      blockedBy.push('HIGH_VIX');
    }

    // Check 5: Market Hours
    if (!this.isMarketHours()) {
      blockedBy.push('AFTER_HOURS');
    }

    const allowed = blockedBy.length === 0;
    const reason = allowed
      ? 'All safety checks passed'
      : `Blocked by: ${blockedBy.join(', ')}`;

    return {
      allowed,
      reason,
      blockedBy,
    };
  }

  private isExpiryDay(): boolean {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 4 = Thursday

    // Weekly expiry on Thursday
    if (day === 4) return true;

    // Monthly expiry - last Thursday of month
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const lastThursday = this.getLastThursday(now.getFullYear(), now.getMonth());

    if (now.getDate() === lastThursday.getDate()) return true;

    return false;
  }

  private getLastThursday(year: number, month: number): Date {
    const lastDay = new Date(year, month + 1, 0);
    const day = lastDay.getDay();
    const diff = day >= 4 ? day - 4 : day + 3;
    return new Date(year, month, lastDay.getDate() - diff);
  }

  private isResultDay(symbol: string): boolean {
    // Mock implementation - in production, check against earnings calendar
    // For now, randomly block 5% of stocks to simulate
    const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash % 20 === 0;
  }

  private isWeekend(): boolean {
    const day = new Date().getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  }

  private isMarketHours(): boolean {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Market hours: 9:15 AM to 3:30 PM IST
    const marketStart = 9 * 60 + 15; // 9:15 AM in minutes
    const marketEnd = 15 * 60 + 30; // 3:30 PM in minutes
    const currentTime = hours * 60 + minutes;

    return currentTime >= marketStart && currentTime <= marketEnd;
  }

  isHighRiskPeriod(): boolean {
    return this.isExpiryDay() || !this.isMarketHours();
  }
}
