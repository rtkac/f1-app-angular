import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET,
  Router,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree,
} from '@angular/router';
import { filter, map, distinctUntilChanged, BehaviorSubject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Breadcrumbs } from 'src/app/models/breadcrumbs.model';
import { breadcrumbsLabelFactory } from 'src/app/factories/breadcrumbs.factory';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  private storeSub = new Subscription();
  breadcrumbsSub = new BehaviorSubject<Breadcrumbs[]>([]);
  private breadcrumbsPathArray: string[] = [];
  breadcrumbsPath: string[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.listenForRouteChange();
    this.createBreadcrumbs();
  }

  private listenForRouteChange() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.createBreadcrumbs();
      });
  }

  private createBreadcrumbs() {
    const tree: UrlTree = this.router.parseUrl(window.location.pathname);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const segments: UrlSegment[] = g?.segments;

    this.storeSub = this.store.subscribe((state) => {
      if (segments?.length) {
        if (state.teams.teams?.length || state.drivers.driversDetail?.length) {
          return this.breadcrumbsSub.next([
            {
              path: '',
              label: breadcrumbsLabelFactory('dashboard'),
            },
            ...segments.map((segment, index) => {
              if (segments[index - 1]?.path === 'teams') {
                return {
                  path: segment.path,
                  label: state.teams.teams?.find((team) => team.id === +segment.path)?.name || '',
                };
              }
              if (segments[index - 1]?.path === 'drivers') {
                return {
                  path: segment.path,
                  label: state.drivers.driversDetail?.find((driver) => driver.id === +segment.path)?.name || '',
                };
              }
              return {
                path: segment.path,
                label: breadcrumbsLabelFactory(segment.path),
              };
            }),
          ]);
        }
        return this.breadcrumbsSub.next([]);
      }
      return this.breadcrumbsSub.next([
        {
          path: '',
          label: breadcrumbsLabelFactory('welcome', state.user.user),
        },
      ]);
    });

    this.createBreadcrumbsPath();
  }

  private createBreadcrumbsPath() {
    this.breadcrumbsSub.subscribe((breadcrumbs) => {
      this.breadcrumbsPathArray = breadcrumbs.map((breadcrumb, index) => {
        if (index + 1 !== breadcrumbs.length) {
          return breadcrumb.path;
        }
        return '';
      });

      const pathsArray: string[][] = [];

      this.breadcrumbsPathArray.map((_, index) => {
        if (index + 1 < breadcrumbs.length) {
          pathsArray[index] = this.breadcrumbsPathArray.slice(0, index + 1);
        }
      });

      this.breadcrumbsPath = pathsArray.map((item) => item.join('/'));
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
